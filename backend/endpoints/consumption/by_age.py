from ninja import Query, Router

from data_processing import get_drug_consumption_by_category

from .schemas import (
    ConsumptionResponse,
    ConsumptionRequest,
    ConsumptionErrorResponse,
)
from endpoints.respondent_field_choices import AGE_CHOICES, DRUGS_LIST

by_age_router = Router(tags=["Consumption By Age"])


@by_age_router.get(
    "/",
    response={200: ConsumptionResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption by age"],
)
def consumption_by_age(
    request,
    params: Query[ConsumptionRequest],
):
    """
    Endpoint to GET the consumption statistics of a given drug in a given age range.

    Example usage:
        
        /api/consumption/by_age?age_range=18-24&drug=meth
        /api/consumptionb/by_age?age_range=25-34&drug=alcohol

    Parameters:
        
        - age_range: str, age range to filter the dataset by. Allowed values: "18-24", "25-34", "35-44", "45-54", "55-64", "65"

        - drug: str, drug to display consumption for.

        Allowed values: "alcohol", "amphet", "amyl", "benzos", "caff", "cannabis",
                        "choc", "coke", "crack", "ecstasy", "heroin", "ketamine",
                        "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"

    """

    age_range = "65+" if params.age_range == "65" else params.age_range
    age_choices = [choice[0] for choice in AGE_CHOICES]

    if age_range not in age_choices:
        return 400, {"message": "invalid age_range", "allowed_values": age_choices}

    drug = params.drug.lower()

    if drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    return get_drug_consumption_by_category(
        category="age", value=age_range, drug=params.drug
    )
