/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetProductsByTag($tag: [String]) {\n    products(first: 4, where: { tagIn: $tag }) {\n      nodes {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      } \n      \n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n} \n": typeof types.GetProductsByTagDocument,
    "\n  query GetProductById($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n      }\n\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetProductByIdDocument,
};
const documents: Documents = {
    "\n  query GetProductsByTag($tag: [String]) {\n    products(first: 4, where: { tagIn: $tag }) {\n      nodes {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      } \n      \n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n} \n": types.GetProductsByTagDocument,
    "\n  query GetProductById($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n      }\n\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n": types.GetProductByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProductsByTag($tag: [String]) {\n    products(first: 4, where: { tagIn: $tag }) {\n      nodes {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      } \n      \n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n} \n"): (typeof documents)["\n  query GetProductsByTag($tag: [String]) {\n    products(first: 4, where: { tagIn: $tag }) {\n      nodes {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      } \n      \n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n      }\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        productTags {\n          nodes {\n            name\n            slug\n          }\n        }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n} \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProductById($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n      }\n\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductById($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      slug\n      description\n      averageRating\n      shortDescription\n      image {\n        sourceUrl\n        altText\n      }\n      ... on SimpleProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n      }\n\n      ... on VariableProduct {\n        price\n        regularPrice\n        salePrice\n        sku\n        stockStatus\n        galleryImages {\n        nodes {\n          sourceUrl\n          altText\n        }\n      }\n        variations(first: 10) {\n          nodes {\n            name\n            price\n            sku\n            stockStatus\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;