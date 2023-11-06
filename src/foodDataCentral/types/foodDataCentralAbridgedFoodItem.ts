//Do not modify file. These interfaces were generated using https://editor.swagger.io/#/

/**
 *
 * @export
 * @interface AbridgedFoodItem
 */
export interface FoodDataCentralAbridgedFoodItem {
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  dataType: string;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  description: string;
  /**
   *
   * @type {number}
   * @memberof AbridgedFoodItem
   */
  fdcId: number;
  /**
   *
   * @type {Array<AbridgedFoodNutrient>}
   * @memberof AbridgedFoodItem
   */
  foodNutrients?: Array<AbridgedFoodNutrient>;
  /**
   *
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  publicationDate?: string;
  /**
   * only applies to Branded Foods
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  brandOwner?: string;
  /**
   * only applies to Branded Foods
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  gtinUpc?: string;
  /**
   * only applies to Foundation and SRLegacy Foods
   * @type {number}
   * @memberof AbridgedFoodItem
   */
  ndbNumber?: number;
  /**
   * only applies to Survey Foods
   * @type {string}
   * @memberof AbridgedFoodItem
   */
  foodCode?: string;
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
