//Do not modify file. These interfaces were generated using https://editor.swagger.io/#/

export interface FoodDataCentralSearchResultType {
  /**
   *
   * @type {FoodSearchCriteria}
   * @memberof SearchResult
   */
  foodSearchCriteria?: FoodSearchCriteria;
  /**
   * The total number of foods found matching the search criteria.
   * @type {number}
   * @memberof SearchResult
   */
  totalHits?: number;
  /**
   * The current page of results being returned.
   * @type {number}
   * @memberof SearchResult
   */
  currentPage?: number;
  /**
   * The total number of pages found matching the search criteria.
   * @type {number}
   * @memberof SearchResult
   */
  totalPages?: number;
  /**
   * The list of foods found matching the search criteria. See Food Fields below.
   * @type {Array<SearchResultFood>}
   * @memberof SearchResult
   */
  foods?: Array<SearchResultFood>;
}
/**
 *
 * @export
 * @interface SearchResultFood
 */
interface SearchResultFood {
  /**
   * Unique ID of the food.
   * @type {number}
   * @memberof SearchResultFood
   */
  fdcId: number;
  /**
   * The type of the food data.
   * @type {string}
   * @memberof SearchResultFood
   */
  dataType?: string;
  /**
   * The description of the food.
   * @type {string}
   * @memberof SearchResultFood
   */
  description: string;
  /**
   * Any A unique ID identifying the food within FNDDS.
   * @type {string}
   * @memberof SearchResultFood
   */
  foodCode?: string;
  /**
   *
   * @type {Array<AbridgedFoodNutrient>}
   * @memberof SearchResultFood
   */
  foodNutrients?: Array<AbridgedFoodNutrient>;
  /**
   * Date the item was published to FDC.
   * @type {string}
   * @memberof SearchResultFood
   */
  publicationDate?: string;
  /**
   * The scientific name of the food.
   * @type {string}
   * @memberof SearchResultFood
   */
  scientificName?: string;
  /**
   * Brand owner for the food. Only applies to Branded Foods.
   * @type {string}
   * @memberof SearchResultFood
   */
  brandOwner?: string;
  /**
   * GTIN or UPC code identifying the food. Only applies to Branded Foods.
   * @type {string}
   * @memberof SearchResultFood
   */
  gtinUpc?: string;
  /**
   * The list of ingredients (as it appears on the product label). Only applies to Branded Foods.
   * @type {string}
   * @memberof SearchResultFood
   */
  ingredients?: string;
  /**
   * Unique number assigned for foundation foods. Only applies to Foundation and SRLegacy Foods.
   * @type {number}
   * @memberof SearchResultFood
   */
  ndbNumber?: number;
  /**
   * Any additional descriptions of the food.
   * @type {string}
   * @memberof SearchResultFood
   */
  additionalDescriptions?: string;
  /**
   * allHighlightFields
   * @type {string}
   * @memberof SearchResultFood
   */
  allHighlightFields?: string;
  /**
   * Relative score indicating how well the food matches the search criteria.
   * @type {number}
   * @memberof SearchResultFood
   */
  score?: number;
}

interface FoodSearchCriteria {
  /**
   * Search terms to use in the search. The string may also include standard [search operators](https://fdc.nal.usda.gov/help.html#bkmk-2)
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  query?: string;
  /**
   * Optional. Filter on a specific data type; specify one or more values in an array.
   * @type {Array<string>}
   * @memberof FoodSearchCriteria
   */
  dataType?: Array<FoodSearchCriteria.DataTypeEnum>;
  /**
   * Optional. Maximum number of results to return for the current page. Default is 50.
   * @type {number}
   * @memberof FoodSearchCriteria
   */
  pageSize?: number;
  /**
   * Optional. Page number to retrieve. The offset into the overall result set is expressed as (pageNumber * pageSize)
   * @type {number}
   * @memberof FoodSearchCriteria
   */
  pageNumber?: number;
  /**
   * Optional. Specify one of the possible values to sort by that field. Note, dataType.keyword will be dataType and description.keyword will be description in future releases.
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  sortBy?: FoodSearchCriteria.SortByEnum;
  /**
   * Optional. The sort direction for the results. Only applicable if sortBy is specified.
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  sortOrder?: FoodSearchCriteria.SortOrderEnum;
  /**
   * Optional. Filter results based on the brand owner of the food. Only applies to Branded Foods.
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  brandOwner?: string;
  /**
   * Optional. Filter foods containing any of the specified trade channels.
   * @type {Array<string>}
   * @memberof FoodSearchCriteria
   */
  tradeChannel?: Array<FoodSearchCriteria.TradeChannelEnum>;
  /**
   * Filter foods published on or after this date. Format: YYYY-MM-DD
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  startDate?: string;
  /**
   * Filter foods published on or before this date. Format: YYYY-MM-DD
   * @type {string}
   * @memberof FoodSearchCriteria
   */
  endDate?: string;
}

interface AbridgedFoodNutrient {
  /**
   *
   * @type {number}
   * @memberof AbridgedFoodNutrient
   */
  number?: number;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodNutrient
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof AbridgedFoodNutrient
   */
  amount?: number;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodNutrient
   */
  unitName?: string;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodNutrient
   */
  derivationCode?: string;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodNutrient
   */
  derivationDescription?: string;
}

export namespace FoodSearchCriteria {
  /**
   * @export
   * @enum {string}
   */
  export enum DataTypeEnum {
    Branded = <any>"Branded",
    Foundation = <any>"Foundation",
    SurveyFNDDS = <any>"Survey (FNDDS)",
    SRLegacy = <any>"SR Legacy",
  }
  /**
   * @export
   * @enum {string}
   */
  export enum SortByEnum {
    DataTypeKeyword = <any>"dataType.keyword",
    LowercaseDescriptionKeyword = <any>"lowercaseDescription.keyword",
    FdcId = <any>"fdcId",
    PublishedDate = <any>"publishedDate",
  }
  /**
   * @export
   * @enum {string}
   */
  export enum SortOrderEnum {
    Asc = <any>"asc",
    Desc = <any>"desc",
  }
  /**
   * @export
   * @enum {string}
   */
  export enum TradeChannelEnum {
    CHILDNUTRITIONFOODPROGRAMS = <any>"CHILD_NUTRITION_FOOD_PROGRAMS",
    DRUG = <any>"DRUG",
    FOODSERVICE = <any>"FOOD_SERVICE",
    GROCERY = <any>"GROCERY",
    MASSMERCHANDISING = <any>"MASS_MERCHANDISING",
    MILITARY = <any>"MILITARY",
    ONLINE = <any>"ONLINE",
    VENDING = <any>"VENDING",
  }
}
