from ninja import Query, Router

from data_processing import get_population_repartition

from .schemas import (
    PopulationRepartitionResponse,
    PopulationRepartitionRequest,
    PopulationRepartitionErrorResponse,
)

by_population_router = Router(tags=["Repartition by Population"])


@by_population_router.get(
    "/",
    response={
        200: PopulationRepartitionResponse,
        400: PopulationRepartitionErrorResponse,
    },
    tags=["Repartition by population"],
)
def population_repartition(
    request,
    params: Query[PopulationRepartitionRequest],
):
    """
    Endpoint to GET the repartition of a given population in the database.
    For instance with the "age" parameter, you can check how many men and women have taken the survey.

    Default value is set to "age" for population.

    Example usage:
        
        /api/repartition/by_population/?population=age
        /api/repartition/by_population/?population=country

    Parameters:
        
        - population: str, population to display repartition for.

        Allowed values: "age", "country", "education", "ethnicity", "gender"
    """

    population_choices = ["age", "country", "education", "ethnicity", "gender"]

    if params.population not in population_choices:
        return 400, {"message": f"population must be one of {population_choices}"}

    return 200, get_population_repartition(population=params.population)
