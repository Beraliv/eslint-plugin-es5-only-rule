import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export const isObjectValuesMemberExpression = (
  node: TSESTree.MemberExpression
) =>
  node.object.type === AST_NODE_TYPES.Identifier &&
  node.object.name === "Object" &&
  node.property.type === AST_NODE_TYPES.Identifier &&
  node.property.name === "values";
