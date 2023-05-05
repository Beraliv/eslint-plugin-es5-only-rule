import { createRule } from "../createRule";
import { isObjectValuesMemberExpression } from "../isObjectValuesMemberExpression";

export const banObjectValuesRule = createRule({
  create: (context) => ({
    MemberExpression(node): void {
      if (isObjectValuesMemberExpression(node)) {
        context.report({
          node,
          messageId: "message",
          data: { method: "Object.values" },
        });
      }
    },
  }),
  name: "ban-object-values",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `<method>` method",
      recommended: "error",
    },
    messages: {
      message: "Do not use `{{method}}` to avoid polyfills",
    },
    schema: {
      $defs: {
        directiveConfigSchema: {
          oneOf: [
            {
              type: "boolean",
              default: true,
            },
          ],
        },
      },
      prefixItems: [
        {
          properties: {
            objectValues: {
              $ref: "#/$defs/directiveConfigSchema",
            },
          },
          additionalProperties: false,
        },
      ],
      type: "array",
    },
  },
  defaultOptions: [
    {
      objectValues: true,
    },
  ],
});
