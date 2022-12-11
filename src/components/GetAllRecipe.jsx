import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query'
import Recipe from './Recipe';

const endpoint = 'https://long-gold-woodpecker-toga.cyclic.app';

async function fetchGetRecipe(page = 1, limit = 2, status = 'publish') {
    const headers = {
        "content-type": "application/json"
    }

    const graphqlQuery = {
        "query": `query GetAllRecipe($page: Int, $limit: Int, $status: String) {
            getAllRecipe(page: $page, limit: $limit, status: $status) {
              maxPage
              recipes {
                id
                available
                recipe_name
                special_offer_price
              }
            }
          }`,
        "variables": {
            "page": page,
            "limit": limit,
            "status": status,
        }
    }

    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(graphqlQuery),
    }

    const response = await fetch(endpoint, options);
    const json = await response.json();

    return json.data.getAllRecipe
}

function GetAllRecipe() {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(null)

    const { data, isError, isLoading, error } = useQuery(['recipes', currentPage], () => fetchGetRecipe(currentPage))

    const queryClient = useQueryClient();

    useEffect(() => {
        data && setMaxPage(data.maxPage)
        if (currentPage < maxPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(['recipes', nextPage], () => fetchGetRecipe(nextPage))
        }
    }, [data, queryClient, currentPage, maxPage])

    return (
        <>
            <div>GetAllRecipe</div>
            <div>
                <h2>Page {currentPage} / {maxPage}</h2>
            </div>
            <div>
                <button disabled={isError || isLoading || currentPage <= 1} onClick={() => setCurrentPage(1)}>First Page</button>
                <button disabled={isError || isLoading || currentPage <= 1} onClick={() => setCurrentPage(prevState => prevState - 1)}>Prev Page</button>
                <button disabled={isError || isLoading || currentPage >= maxPage} onClick={() => setCurrentPage(prevState => prevState + 1)}>Next Page</button>
                <button disabled={isError || isLoading || currentPage >= maxPage} onClick={() => setCurrentPage(maxPage)}>Last Page</button>
            </div >
            {isLoading && <h2>Loading Recipes</h2>
            }
            {isError && <h2>{error.toString()}</h2>}
            {
                !isLoading && data && data.recipes.map(recipe => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))
            }

        </>
    )
}

export default GetAllRecipe
