/**
 * @param {Number} code - status code of the response
 * @param {string} description - description identify the code
 * @param {{}} payload - response object
 * @param {Token} token - jwt token
 * @returns {{}}
 */

 export interface ICustomResponse{ 
    code: number; 
    description: string; 
    payload: any 
  }
  
  export function customResponse(
    code: number,
    description: string,
    payload: object | null = undefined,
  ): ICustomResponse {
    return {
      code,
      description,
      payload,
    };
}
  