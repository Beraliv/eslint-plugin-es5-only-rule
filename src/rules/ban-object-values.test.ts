import { describe, it } from "vitest";

import { ESLintUtils } from "@typescript-eslint/utils";
import { banObjectValuesRule } from "./ban-object-values";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

describe("ban-object-values", () => {
  it("runs valid and invalid test cases", () => {
    ruleTester.run("ban-object-values", banObjectValuesRule, {
      valid: [
        // Object method, but not values
        {
          code: `
            const obj = { a: 1, b: 2, c: 3 };
            const objKeys = Object.keys(obj);
          `,
        },
        // "values" method, but not called on Object
        {
          code: `
            const set = new Set([1, 2, 3]);
            const setValues = [...set.values()]
          `,
        },
      ],
      invalid: [
        {
          code: `
            const obj = { a: 1, b: 2, c: 3 };
            const objValues = Object.values(obj);
          `,
          errors: [{ messageId: "message" }],
        },
      ],
    });
  });
});
