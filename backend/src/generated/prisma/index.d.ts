
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Mercadoria
 * 
 */
export type Mercadoria = $Result.DefaultSelection<Prisma.$MercadoriaPayload>
/**
 * Model Foto
 * 
 */
export type Foto = $Result.DefaultSelection<Prisma.$FotoPayload>
/**
 * Model Venda
 * 
 */
export type Venda = $Result.DefaultSelection<Prisma.$VendaPayload>
/**
 * Model Parcela
 * 
 */
export type Parcela = $Result.DefaultSelection<Prisma.$ParcelaPayload>
/**
 * Model Comprovante
 * 
 */
export type Comprovante = $Result.DefaultSelection<Prisma.$ComprovantePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mercadoria`: Exposes CRUD operations for the **Mercadoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mercadorias
    * const mercadorias = await prisma.mercadoria.findMany()
    * ```
    */
  get mercadoria(): Prisma.MercadoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foto`: Exposes CRUD operations for the **Foto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fotos
    * const fotos = await prisma.foto.findMany()
    * ```
    */
  get foto(): Prisma.FotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venda`: Exposes CRUD operations for the **Venda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendas
    * const vendas = await prisma.venda.findMany()
    * ```
    */
  get venda(): Prisma.VendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parcela`: Exposes CRUD operations for the **Parcela** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parcelas
    * const parcelas = await prisma.parcela.findMany()
    * ```
    */
  get parcela(): Prisma.ParcelaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comprovante`: Exposes CRUD operations for the **Comprovante** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comprovantes
    * const comprovantes = await prisma.comprovante.findMany()
    * ```
    */
  get comprovante(): Prisma.ComprovanteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Cliente: 'Cliente',
    Mercadoria: 'Mercadoria',
    Foto: 'Foto',
    Venda: 'Venda',
    Parcela: 'Parcela',
    Comprovante: 'Comprovante'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "cliente" | "mercadoria" | "foto" | "venda" | "parcela" | "comprovante"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Mercadoria: {
        payload: Prisma.$MercadoriaPayload<ExtArgs>
        fields: Prisma.MercadoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MercadoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MercadoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          findFirst: {
            args: Prisma.MercadoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MercadoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          findMany: {
            args: Prisma.MercadoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>[]
          }
          create: {
            args: Prisma.MercadoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          createMany: {
            args: Prisma.MercadoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MercadoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          update: {
            args: Prisma.MercadoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          deleteMany: {
            args: Prisma.MercadoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MercadoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MercadoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MercadoriaPayload>
          }
          aggregate: {
            args: Prisma.MercadoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMercadoria>
          }
          groupBy: {
            args: Prisma.MercadoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MercadoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MercadoriaCountArgs<ExtArgs>
            result: $Utils.Optional<MercadoriaCountAggregateOutputType> | number
          }
        }
      }
      Foto: {
        payload: Prisma.$FotoPayload<ExtArgs>
        fields: Prisma.FotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          findFirst: {
            args: Prisma.FotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          findMany: {
            args: Prisma.FotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>[]
          }
          create: {
            args: Prisma.FotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          createMany: {
            args: Prisma.FotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          update: {
            args: Prisma.FotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          deleteMany: {
            args: Prisma.FotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FotoPayload>
          }
          aggregate: {
            args: Prisma.FotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoto>
          }
          groupBy: {
            args: Prisma.FotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FotoCountArgs<ExtArgs>
            result: $Utils.Optional<FotoCountAggregateOutputType> | number
          }
        }
      }
      Venda: {
        payload: Prisma.$VendaPayload<ExtArgs>
        fields: Prisma.VendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          findFirst: {
            args: Prisma.VendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          findMany: {
            args: Prisma.VendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>[]
          }
          create: {
            args: Prisma.VendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          createMany: {
            args: Prisma.VendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          update: {
            args: Prisma.VendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          deleteMany: {
            args: Prisma.VendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          aggregate: {
            args: Prisma.VendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenda>
          }
          groupBy: {
            args: Prisma.VendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendaCountArgs<ExtArgs>
            result: $Utils.Optional<VendaCountAggregateOutputType> | number
          }
        }
      }
      Parcela: {
        payload: Prisma.$ParcelaPayload<ExtArgs>
        fields: Prisma.ParcelaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParcelaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParcelaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          findFirst: {
            args: Prisma.ParcelaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParcelaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          findMany: {
            args: Prisma.ParcelaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>[]
          }
          create: {
            args: Prisma.ParcelaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          createMany: {
            args: Prisma.ParcelaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ParcelaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          update: {
            args: Prisma.ParcelaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          deleteMany: {
            args: Prisma.ParcelaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParcelaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParcelaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParcelaPayload>
          }
          aggregate: {
            args: Prisma.ParcelaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParcela>
          }
          groupBy: {
            args: Prisma.ParcelaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParcelaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParcelaCountArgs<ExtArgs>
            result: $Utils.Optional<ParcelaCountAggregateOutputType> | number
          }
        }
      }
      Comprovante: {
        payload: Prisma.$ComprovantePayload<ExtArgs>
        fields: Prisma.ComprovanteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComprovanteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComprovanteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          findFirst: {
            args: Prisma.ComprovanteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComprovanteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          findMany: {
            args: Prisma.ComprovanteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>[]
          }
          create: {
            args: Prisma.ComprovanteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          createMany: {
            args: Prisma.ComprovanteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ComprovanteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          update: {
            args: Prisma.ComprovanteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          deleteMany: {
            args: Prisma.ComprovanteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComprovanteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComprovanteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComprovantePayload>
          }
          aggregate: {
            args: Prisma.ComprovanteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComprovante>
          }
          groupBy: {
            args: Prisma.ComprovanteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComprovanteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComprovanteCountArgs<ExtArgs>
            result: $Utils.Optional<ComprovanteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    cliente?: ClienteOmit
    mercadoria?: MercadoriaOmit
    foto?: FotoOmit
    venda?: VendaOmit
    parcela?: ParcelaOmit
    comprovante?: ComprovanteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    vendas: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendas?: boolean | ClienteCountOutputTypeCountVendasArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountVendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaWhereInput
  }


  /**
   * Count Type MercadoriaCountOutputType
   */

  export type MercadoriaCountOutputType = {
    fotos: number
  }

  export type MercadoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fotos?: boolean | MercadoriaCountOutputTypeCountFotosArgs
  }

  // Custom InputTypes
  /**
   * MercadoriaCountOutputType without action
   */
  export type MercadoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MercadoriaCountOutputType
     */
    select?: MercadoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MercadoriaCountOutputType without action
   */
  export type MercadoriaCountOutputTypeCountFotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FotoWhereInput
  }


  /**
   * Count Type VendaCountOutputType
   */

  export type VendaCountOutputType = {
    parcelas: number
  }

  export type VendaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parcelas?: boolean | VendaCountOutputTypeCountParcelasArgs
  }

  // Custom InputTypes
  /**
   * VendaCountOutputType without action
   */
  export type VendaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaCountOutputType
     */
    select?: VendaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendaCountOutputType without action
   */
  export type VendaCountOutputTypeCountParcelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParcelaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    telefone: string | null
    endereco: string | null
    senha: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    telefone: string | null
    endereco: string | null
    senha: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    telefone: number
    endereco: number
    senha: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    telefone?: true
    endereco?: true
    senha?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    telefone?: true
    endereco?: true
    senha?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    telefone?: true
    endereco?: true
    senha?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    nome: string
    email: string
    telefone: string
    endereco: string | null
    senha: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    telefone?: boolean
    endereco?: boolean
    senha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    telefone?: boolean
    endereco?: boolean
    senha?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "telefone" | "endereco" | "senha" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string
      telefone: string
      endereco: string | null
      senha: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly telefone: FieldRef<"User", 'String'>
    readonly endereco: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteAvgAggregateOutputType = {
    id: number | null
  }

  export type ClienteSumAggregateOutputType = {
    id: number | null
  }

  export type ClienteMinAggregateOutputType = {
    id: number | null
    nome: string | null
    telefone: string | null
    cpf: string | null
    endereco: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    telefone: string | null
    cpf: string | null
    endereco: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nome: number
    telefone: number
    cpf: number
    endereco: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClienteAvgAggregateInputType = {
    id?: true
  }

  export type ClienteSumAggregateInputType = {
    id?: true
  }

  export type ClienteMinAggregateInputType = {
    id?: true
    nome?: true
    telefone?: true
    cpf?: true
    endereco?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nome?: true
    telefone?: true
    cpf?: true
    endereco?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nome?: true
    telefone?: true
    cpf?: true
    endereco?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _avg?: ClienteAvgAggregateInputType
    _sum?: ClienteSumAggregateInputType
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: number
    nome: string
    telefone: string
    cpf: string
    endereco: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    telefone?: boolean
    cpf?: boolean
    endereco?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendas?: boolean | Cliente$vendasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>



  export type ClienteSelectScalar = {
    id?: boolean
    nome?: boolean
    telefone?: boolean
    cpf?: boolean
    endereco?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "telefone" | "cpf" | "endereco" | "createdAt" | "updatedAt", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendas?: boolean | Cliente$vendasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      vendas: Prisma.$VendaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      telefone: string
      cpf: string
      endereco: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendas<T extends Cliente$vendasArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$vendasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'Int'>
    readonly nome: FieldRef<"Cliente", 'String'>
    readonly telefone: FieldRef<"Cliente", 'String'>
    readonly cpf: FieldRef<"Cliente", 'String'>
    readonly endereco: FieldRef<"Cliente", 'String'>
    readonly createdAt: FieldRef<"Cliente", 'DateTime'>
    readonly updatedAt: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.vendas
   */
  export type Cliente$vendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    where?: VendaWhereInput
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    cursor?: VendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Mercadoria
   */

  export type AggregateMercadoria = {
    _count: MercadoriaCountAggregateOutputType | null
    _avg: MercadoriaAvgAggregateOutputType | null
    _sum: MercadoriaSumAggregateOutputType | null
    _min: MercadoriaMinAggregateOutputType | null
    _max: MercadoriaMaxAggregateOutputType | null
  }

  export type MercadoriaAvgAggregateOutputType = {
    id: number | null
    valorUnitario: number | null
    quantidadeEstoque: number | null
  }

  export type MercadoriaSumAggregateOutputType = {
    id: number | null
    valorUnitario: number | null
    quantidadeEstoque: number | null
  }

  export type MercadoriaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    valorUnitario: number | null
    quantidadeEstoque: number | null
    descricao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MercadoriaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    valorUnitario: number | null
    quantidadeEstoque: number | null
    descricao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MercadoriaCountAggregateOutputType = {
    id: number
    nome: number
    valorUnitario: number
    quantidadeEstoque: number
    descricao: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MercadoriaAvgAggregateInputType = {
    id?: true
    valorUnitario?: true
    quantidadeEstoque?: true
  }

  export type MercadoriaSumAggregateInputType = {
    id?: true
    valorUnitario?: true
    quantidadeEstoque?: true
  }

  export type MercadoriaMinAggregateInputType = {
    id?: true
    nome?: true
    valorUnitario?: true
    quantidadeEstoque?: true
    descricao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MercadoriaMaxAggregateInputType = {
    id?: true
    nome?: true
    valorUnitario?: true
    quantidadeEstoque?: true
    descricao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MercadoriaCountAggregateInputType = {
    id?: true
    nome?: true
    valorUnitario?: true
    quantidadeEstoque?: true
    descricao?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MercadoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mercadoria to aggregate.
     */
    where?: MercadoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mercadorias to fetch.
     */
    orderBy?: MercadoriaOrderByWithRelationInput | MercadoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MercadoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mercadorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mercadorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mercadorias
    **/
    _count?: true | MercadoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MercadoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MercadoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MercadoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MercadoriaMaxAggregateInputType
  }

  export type GetMercadoriaAggregateType<T extends MercadoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateMercadoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMercadoria[P]>
      : GetScalarType<T[P], AggregateMercadoria[P]>
  }




  export type MercadoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MercadoriaWhereInput
    orderBy?: MercadoriaOrderByWithAggregationInput | MercadoriaOrderByWithAggregationInput[]
    by: MercadoriaScalarFieldEnum[] | MercadoriaScalarFieldEnum
    having?: MercadoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MercadoriaCountAggregateInputType | true
    _avg?: MercadoriaAvgAggregateInputType
    _sum?: MercadoriaSumAggregateInputType
    _min?: MercadoriaMinAggregateInputType
    _max?: MercadoriaMaxAggregateInputType
  }

  export type MercadoriaGroupByOutputType = {
    id: number
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao: string | null
    createdAt: Date
    updatedAt: Date
    _count: MercadoriaCountAggregateOutputType | null
    _avg: MercadoriaAvgAggregateOutputType | null
    _sum: MercadoriaSumAggregateOutputType | null
    _min: MercadoriaMinAggregateOutputType | null
    _max: MercadoriaMaxAggregateOutputType | null
  }

  type GetMercadoriaGroupByPayload<T extends MercadoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MercadoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MercadoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MercadoriaGroupByOutputType[P]>
            : GetScalarType<T[P], MercadoriaGroupByOutputType[P]>
        }
      >
    >


  export type MercadoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    valorUnitario?: boolean
    quantidadeEstoque?: boolean
    descricao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fotos?: boolean | Mercadoria$fotosArgs<ExtArgs>
    _count?: boolean | MercadoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mercadoria"]>



  export type MercadoriaSelectScalar = {
    id?: boolean
    nome?: boolean
    valorUnitario?: boolean
    quantidadeEstoque?: boolean
    descricao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MercadoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "valorUnitario" | "quantidadeEstoque" | "descricao" | "createdAt" | "updatedAt", ExtArgs["result"]["mercadoria"]>
  export type MercadoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fotos?: boolean | Mercadoria$fotosArgs<ExtArgs>
    _count?: boolean | MercadoriaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MercadoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mercadoria"
    objects: {
      fotos: Prisma.$FotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      valorUnitario: number
      quantidadeEstoque: number
      descricao: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mercadoria"]>
    composites: {}
  }

  type MercadoriaGetPayload<S extends boolean | null | undefined | MercadoriaDefaultArgs> = $Result.GetResult<Prisma.$MercadoriaPayload, S>

  type MercadoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MercadoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MercadoriaCountAggregateInputType | true
    }

  export interface MercadoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mercadoria'], meta: { name: 'Mercadoria' } }
    /**
     * Find zero or one Mercadoria that matches the filter.
     * @param {MercadoriaFindUniqueArgs} args - Arguments to find a Mercadoria
     * @example
     * // Get one Mercadoria
     * const mercadoria = await prisma.mercadoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MercadoriaFindUniqueArgs>(args: SelectSubset<T, MercadoriaFindUniqueArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mercadoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MercadoriaFindUniqueOrThrowArgs} args - Arguments to find a Mercadoria
     * @example
     * // Get one Mercadoria
     * const mercadoria = await prisma.mercadoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MercadoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, MercadoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mercadoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaFindFirstArgs} args - Arguments to find a Mercadoria
     * @example
     * // Get one Mercadoria
     * const mercadoria = await prisma.mercadoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MercadoriaFindFirstArgs>(args?: SelectSubset<T, MercadoriaFindFirstArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mercadoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaFindFirstOrThrowArgs} args - Arguments to find a Mercadoria
     * @example
     * // Get one Mercadoria
     * const mercadoria = await prisma.mercadoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MercadoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, MercadoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mercadorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mercadorias
     * const mercadorias = await prisma.mercadoria.findMany()
     * 
     * // Get first 10 Mercadorias
     * const mercadorias = await prisma.mercadoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mercadoriaWithIdOnly = await prisma.mercadoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MercadoriaFindManyArgs>(args?: SelectSubset<T, MercadoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mercadoria.
     * @param {MercadoriaCreateArgs} args - Arguments to create a Mercadoria.
     * @example
     * // Create one Mercadoria
     * const Mercadoria = await prisma.mercadoria.create({
     *   data: {
     *     // ... data to create a Mercadoria
     *   }
     * })
     * 
     */
    create<T extends MercadoriaCreateArgs>(args: SelectSubset<T, MercadoriaCreateArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mercadorias.
     * @param {MercadoriaCreateManyArgs} args - Arguments to create many Mercadorias.
     * @example
     * // Create many Mercadorias
     * const mercadoria = await prisma.mercadoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MercadoriaCreateManyArgs>(args?: SelectSubset<T, MercadoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mercadoria.
     * @param {MercadoriaDeleteArgs} args - Arguments to delete one Mercadoria.
     * @example
     * // Delete one Mercadoria
     * const Mercadoria = await prisma.mercadoria.delete({
     *   where: {
     *     // ... filter to delete one Mercadoria
     *   }
     * })
     * 
     */
    delete<T extends MercadoriaDeleteArgs>(args: SelectSubset<T, MercadoriaDeleteArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mercadoria.
     * @param {MercadoriaUpdateArgs} args - Arguments to update one Mercadoria.
     * @example
     * // Update one Mercadoria
     * const mercadoria = await prisma.mercadoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MercadoriaUpdateArgs>(args: SelectSubset<T, MercadoriaUpdateArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mercadorias.
     * @param {MercadoriaDeleteManyArgs} args - Arguments to filter Mercadorias to delete.
     * @example
     * // Delete a few Mercadorias
     * const { count } = await prisma.mercadoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MercadoriaDeleteManyArgs>(args?: SelectSubset<T, MercadoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mercadorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mercadorias
     * const mercadoria = await prisma.mercadoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MercadoriaUpdateManyArgs>(args: SelectSubset<T, MercadoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mercadoria.
     * @param {MercadoriaUpsertArgs} args - Arguments to update or create a Mercadoria.
     * @example
     * // Update or create a Mercadoria
     * const mercadoria = await prisma.mercadoria.upsert({
     *   create: {
     *     // ... data to create a Mercadoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mercadoria we want to update
     *   }
     * })
     */
    upsert<T extends MercadoriaUpsertArgs>(args: SelectSubset<T, MercadoriaUpsertArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mercadorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaCountArgs} args - Arguments to filter Mercadorias to count.
     * @example
     * // Count the number of Mercadorias
     * const count = await prisma.mercadoria.count({
     *   where: {
     *     // ... the filter for the Mercadorias we want to count
     *   }
     * })
    **/
    count<T extends MercadoriaCountArgs>(
      args?: Subset<T, MercadoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MercadoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mercadoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MercadoriaAggregateArgs>(args: Subset<T, MercadoriaAggregateArgs>): Prisma.PrismaPromise<GetMercadoriaAggregateType<T>>

    /**
     * Group by Mercadoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MercadoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MercadoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MercadoriaGroupByArgs['orderBy'] }
        : { orderBy?: MercadoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MercadoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMercadoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mercadoria model
   */
  readonly fields: MercadoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mercadoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MercadoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fotos<T extends Mercadoria$fotosArgs<ExtArgs> = {}>(args?: Subset<T, Mercadoria$fotosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mercadoria model
   */
  interface MercadoriaFieldRefs {
    readonly id: FieldRef<"Mercadoria", 'Int'>
    readonly nome: FieldRef<"Mercadoria", 'String'>
    readonly valorUnitario: FieldRef<"Mercadoria", 'Float'>
    readonly quantidadeEstoque: FieldRef<"Mercadoria", 'Int'>
    readonly descricao: FieldRef<"Mercadoria", 'String'>
    readonly createdAt: FieldRef<"Mercadoria", 'DateTime'>
    readonly updatedAt: FieldRef<"Mercadoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mercadoria findUnique
   */
  export type MercadoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter, which Mercadoria to fetch.
     */
    where: MercadoriaWhereUniqueInput
  }

  /**
   * Mercadoria findUniqueOrThrow
   */
  export type MercadoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter, which Mercadoria to fetch.
     */
    where: MercadoriaWhereUniqueInput
  }

  /**
   * Mercadoria findFirst
   */
  export type MercadoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter, which Mercadoria to fetch.
     */
    where?: MercadoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mercadorias to fetch.
     */
    orderBy?: MercadoriaOrderByWithRelationInput | MercadoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mercadorias.
     */
    cursor?: MercadoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mercadorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mercadorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mercadorias.
     */
    distinct?: MercadoriaScalarFieldEnum | MercadoriaScalarFieldEnum[]
  }

  /**
   * Mercadoria findFirstOrThrow
   */
  export type MercadoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter, which Mercadoria to fetch.
     */
    where?: MercadoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mercadorias to fetch.
     */
    orderBy?: MercadoriaOrderByWithRelationInput | MercadoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mercadorias.
     */
    cursor?: MercadoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mercadorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mercadorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mercadorias.
     */
    distinct?: MercadoriaScalarFieldEnum | MercadoriaScalarFieldEnum[]
  }

  /**
   * Mercadoria findMany
   */
  export type MercadoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter, which Mercadorias to fetch.
     */
    where?: MercadoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mercadorias to fetch.
     */
    orderBy?: MercadoriaOrderByWithRelationInput | MercadoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mercadorias.
     */
    cursor?: MercadoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mercadorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mercadorias.
     */
    skip?: number
    distinct?: MercadoriaScalarFieldEnum | MercadoriaScalarFieldEnum[]
  }

  /**
   * Mercadoria create
   */
  export type MercadoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Mercadoria.
     */
    data: XOR<MercadoriaCreateInput, MercadoriaUncheckedCreateInput>
  }

  /**
   * Mercadoria createMany
   */
  export type MercadoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mercadorias.
     */
    data: MercadoriaCreateManyInput | MercadoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mercadoria update
   */
  export type MercadoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Mercadoria.
     */
    data: XOR<MercadoriaUpdateInput, MercadoriaUncheckedUpdateInput>
    /**
     * Choose, which Mercadoria to update.
     */
    where: MercadoriaWhereUniqueInput
  }

  /**
   * Mercadoria updateMany
   */
  export type MercadoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mercadorias.
     */
    data: XOR<MercadoriaUpdateManyMutationInput, MercadoriaUncheckedUpdateManyInput>
    /**
     * Filter which Mercadorias to update
     */
    where?: MercadoriaWhereInput
    /**
     * Limit how many Mercadorias to update.
     */
    limit?: number
  }

  /**
   * Mercadoria upsert
   */
  export type MercadoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Mercadoria to update in case it exists.
     */
    where: MercadoriaWhereUniqueInput
    /**
     * In case the Mercadoria found by the `where` argument doesn't exist, create a new Mercadoria with this data.
     */
    create: XOR<MercadoriaCreateInput, MercadoriaUncheckedCreateInput>
    /**
     * In case the Mercadoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MercadoriaUpdateInput, MercadoriaUncheckedUpdateInput>
  }

  /**
   * Mercadoria delete
   */
  export type MercadoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
    /**
     * Filter which Mercadoria to delete.
     */
    where: MercadoriaWhereUniqueInput
  }

  /**
   * Mercadoria deleteMany
   */
  export type MercadoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mercadorias to delete
     */
    where?: MercadoriaWhereInput
    /**
     * Limit how many Mercadorias to delete.
     */
    limit?: number
  }

  /**
   * Mercadoria.fotos
   */
  export type Mercadoria$fotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    where?: FotoWhereInput
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    cursor?: FotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Mercadoria without action
   */
  export type MercadoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mercadoria
     */
    select?: MercadoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mercadoria
     */
    omit?: MercadoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MercadoriaInclude<ExtArgs> | null
  }


  /**
   * Model Foto
   */

  export type AggregateFoto = {
    _count: FotoCountAggregateOutputType | null
    _avg: FotoAvgAggregateOutputType | null
    _sum: FotoSumAggregateOutputType | null
    _min: FotoMinAggregateOutputType | null
    _max: FotoMaxAggregateOutputType | null
  }

  export type FotoAvgAggregateOutputType = {
    id: number | null
    mercadoriaId: number | null
  }

  export type FotoSumAggregateOutputType = {
    id: number | null
    mercadoriaId: number | null
  }

  export type FotoMinAggregateOutputType = {
    id: number | null
    mercadoriaId: number | null
    path: string | null
  }

  export type FotoMaxAggregateOutputType = {
    id: number | null
    mercadoriaId: number | null
    path: string | null
  }

  export type FotoCountAggregateOutputType = {
    id: number
    mercadoriaId: number
    path: number
    _all: number
  }


  export type FotoAvgAggregateInputType = {
    id?: true
    mercadoriaId?: true
  }

  export type FotoSumAggregateInputType = {
    id?: true
    mercadoriaId?: true
  }

  export type FotoMinAggregateInputType = {
    id?: true
    mercadoriaId?: true
    path?: true
  }

  export type FotoMaxAggregateInputType = {
    id?: true
    mercadoriaId?: true
    path?: true
  }

  export type FotoCountAggregateInputType = {
    id?: true
    mercadoriaId?: true
    path?: true
    _all?: true
  }

  export type FotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foto to aggregate.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fotos
    **/
    _count?: true | FotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FotoMaxAggregateInputType
  }

  export type GetFotoAggregateType<T extends FotoAggregateArgs> = {
        [P in keyof T & keyof AggregateFoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoto[P]>
      : GetScalarType<T[P], AggregateFoto[P]>
  }




  export type FotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FotoWhereInput
    orderBy?: FotoOrderByWithAggregationInput | FotoOrderByWithAggregationInput[]
    by: FotoScalarFieldEnum[] | FotoScalarFieldEnum
    having?: FotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FotoCountAggregateInputType | true
    _avg?: FotoAvgAggregateInputType
    _sum?: FotoSumAggregateInputType
    _min?: FotoMinAggregateInputType
    _max?: FotoMaxAggregateInputType
  }

  export type FotoGroupByOutputType = {
    id: number
    mercadoriaId: number
    path: string
    _count: FotoCountAggregateOutputType | null
    _avg: FotoAvgAggregateOutputType | null
    _sum: FotoSumAggregateOutputType | null
    _min: FotoMinAggregateOutputType | null
    _max: FotoMaxAggregateOutputType | null
  }

  type GetFotoGroupByPayload<T extends FotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FotoGroupByOutputType[P]>
            : GetScalarType<T[P], FotoGroupByOutputType[P]>
        }
      >
    >


  export type FotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mercadoriaId?: boolean
    path?: boolean
    mercadoria?: boolean | MercadoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foto"]>



  export type FotoSelectScalar = {
    id?: boolean
    mercadoriaId?: boolean
    path?: boolean
  }

  export type FotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mercadoriaId" | "path", ExtArgs["result"]["foto"]>
  export type FotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mercadoria?: boolean | MercadoriaDefaultArgs<ExtArgs>
  }

  export type $FotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Foto"
    objects: {
      mercadoria: Prisma.$MercadoriaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mercadoriaId: number
      path: string
    }, ExtArgs["result"]["foto"]>
    composites: {}
  }

  type FotoGetPayload<S extends boolean | null | undefined | FotoDefaultArgs> = $Result.GetResult<Prisma.$FotoPayload, S>

  type FotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FotoCountAggregateInputType | true
    }

  export interface FotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Foto'], meta: { name: 'Foto' } }
    /**
     * Find zero or one Foto that matches the filter.
     * @param {FotoFindUniqueArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FotoFindUniqueArgs>(args: SelectSubset<T, FotoFindUniqueArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Foto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FotoFindUniqueOrThrowArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FotoFindUniqueOrThrowArgs>(args: SelectSubset<T, FotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindFirstArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FotoFindFirstArgs>(args?: SelectSubset<T, FotoFindFirstArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Foto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindFirstOrThrowArgs} args - Arguments to find a Foto
     * @example
     * // Get one Foto
     * const foto = await prisma.foto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FotoFindFirstOrThrowArgs>(args?: SelectSubset<T, FotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fotos
     * const fotos = await prisma.foto.findMany()
     * 
     * // Get first 10 Fotos
     * const fotos = await prisma.foto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fotoWithIdOnly = await prisma.foto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FotoFindManyArgs>(args?: SelectSubset<T, FotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Foto.
     * @param {FotoCreateArgs} args - Arguments to create a Foto.
     * @example
     * // Create one Foto
     * const Foto = await prisma.foto.create({
     *   data: {
     *     // ... data to create a Foto
     *   }
     * })
     * 
     */
    create<T extends FotoCreateArgs>(args: SelectSubset<T, FotoCreateArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fotos.
     * @param {FotoCreateManyArgs} args - Arguments to create many Fotos.
     * @example
     * // Create many Fotos
     * const foto = await prisma.foto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FotoCreateManyArgs>(args?: SelectSubset<T, FotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Foto.
     * @param {FotoDeleteArgs} args - Arguments to delete one Foto.
     * @example
     * // Delete one Foto
     * const Foto = await prisma.foto.delete({
     *   where: {
     *     // ... filter to delete one Foto
     *   }
     * })
     * 
     */
    delete<T extends FotoDeleteArgs>(args: SelectSubset<T, FotoDeleteArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Foto.
     * @param {FotoUpdateArgs} args - Arguments to update one Foto.
     * @example
     * // Update one Foto
     * const foto = await prisma.foto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FotoUpdateArgs>(args: SelectSubset<T, FotoUpdateArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fotos.
     * @param {FotoDeleteManyArgs} args - Arguments to filter Fotos to delete.
     * @example
     * // Delete a few Fotos
     * const { count } = await prisma.foto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FotoDeleteManyArgs>(args?: SelectSubset<T, FotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fotos
     * const foto = await prisma.foto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FotoUpdateManyArgs>(args: SelectSubset<T, FotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Foto.
     * @param {FotoUpsertArgs} args - Arguments to update or create a Foto.
     * @example
     * // Update or create a Foto
     * const foto = await prisma.foto.upsert({
     *   create: {
     *     // ... data to create a Foto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Foto we want to update
     *   }
     * })
     */
    upsert<T extends FotoUpsertArgs>(args: SelectSubset<T, FotoUpsertArgs<ExtArgs>>): Prisma__FotoClient<$Result.GetResult<Prisma.$FotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoCountArgs} args - Arguments to filter Fotos to count.
     * @example
     * // Count the number of Fotos
     * const count = await prisma.foto.count({
     *   where: {
     *     // ... the filter for the Fotos we want to count
     *   }
     * })
    **/
    count<T extends FotoCountArgs>(
      args?: Subset<T, FotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Foto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FotoAggregateArgs>(args: Subset<T, FotoAggregateArgs>): Prisma.PrismaPromise<GetFotoAggregateType<T>>

    /**
     * Group by Foto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FotoGroupByArgs['orderBy'] }
        : { orderBy?: FotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Foto model
   */
  readonly fields: FotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Foto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mercadoria<T extends MercadoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MercadoriaDefaultArgs<ExtArgs>>): Prisma__MercadoriaClient<$Result.GetResult<Prisma.$MercadoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Foto model
   */
  interface FotoFieldRefs {
    readonly id: FieldRef<"Foto", 'Int'>
    readonly mercadoriaId: FieldRef<"Foto", 'Int'>
    readonly path: FieldRef<"Foto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Foto findUnique
   */
  export type FotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto findUniqueOrThrow
   */
  export type FotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto findFirst
   */
  export type FotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fotos.
     */
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto findFirstOrThrow
   */
  export type FotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Foto to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fotos.
     */
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto findMany
   */
  export type FotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter, which Fotos to fetch.
     */
    where?: FotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fotos to fetch.
     */
    orderBy?: FotoOrderByWithRelationInput | FotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fotos.
     */
    cursor?: FotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fotos.
     */
    skip?: number
    distinct?: FotoScalarFieldEnum | FotoScalarFieldEnum[]
  }

  /**
   * Foto create
   */
  export type FotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The data needed to create a Foto.
     */
    data: XOR<FotoCreateInput, FotoUncheckedCreateInput>
  }

  /**
   * Foto createMany
   */
  export type FotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fotos.
     */
    data: FotoCreateManyInput | FotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foto update
   */
  export type FotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The data needed to update a Foto.
     */
    data: XOR<FotoUpdateInput, FotoUncheckedUpdateInput>
    /**
     * Choose, which Foto to update.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto updateMany
   */
  export type FotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fotos.
     */
    data: XOR<FotoUpdateManyMutationInput, FotoUncheckedUpdateManyInput>
    /**
     * Filter which Fotos to update
     */
    where?: FotoWhereInput
    /**
     * Limit how many Fotos to update.
     */
    limit?: number
  }

  /**
   * Foto upsert
   */
  export type FotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * The filter to search for the Foto to update in case it exists.
     */
    where: FotoWhereUniqueInput
    /**
     * In case the Foto found by the `where` argument doesn't exist, create a new Foto with this data.
     */
    create: XOR<FotoCreateInput, FotoUncheckedCreateInput>
    /**
     * In case the Foto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FotoUpdateInput, FotoUncheckedUpdateInput>
  }

  /**
   * Foto delete
   */
  export type FotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
    /**
     * Filter which Foto to delete.
     */
    where: FotoWhereUniqueInput
  }

  /**
   * Foto deleteMany
   */
  export type FotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fotos to delete
     */
    where?: FotoWhereInput
    /**
     * Limit how many Fotos to delete.
     */
    limit?: number
  }

  /**
   * Foto without action
   */
  export type FotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foto
     */
    select?: FotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foto
     */
    omit?: FotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FotoInclude<ExtArgs> | null
  }


  /**
   * Model Venda
   */

  export type AggregateVenda = {
    _count: VendaCountAggregateOutputType | null
    _avg: VendaAvgAggregateOutputType | null
    _sum: VendaSumAggregateOutputType | null
    _min: VendaMinAggregateOutputType | null
    _max: VendaMaxAggregateOutputType | null
  }

  export type VendaAvgAggregateOutputType = {
    id: number | null
    clienteId: number | null
    valorTotal: number | null
    entrada: number | null
    numParcelas: number | null
    parcelasRestantes: number | null
  }

  export type VendaSumAggregateOutputType = {
    id: number | null
    clienteId: number | null
    valorTotal: number | null
    entrada: number | null
    numParcelas: number | null
    parcelasRestantes: number | null
  }

  export type VendaMinAggregateOutputType = {
    id: number | null
    clienteId: number | null
    dataVenda: Date | null
    tipoPagamento: string | null
    valorTotal: number | null
    entrada: number | null
    numParcelas: number | null
    parcelasRestantes: number | null
  }

  export type VendaMaxAggregateOutputType = {
    id: number | null
    clienteId: number | null
    dataVenda: Date | null
    tipoPagamento: string | null
    valorTotal: number | null
    entrada: number | null
    numParcelas: number | null
    parcelasRestantes: number | null
  }

  export type VendaCountAggregateOutputType = {
    id: number
    clienteId: number
    dataVenda: number
    tipoPagamento: number
    valorTotal: number
    entrada: number
    numParcelas: number
    parcelasRestantes: number
    _all: number
  }


  export type VendaAvgAggregateInputType = {
    id?: true
    clienteId?: true
    valorTotal?: true
    entrada?: true
    numParcelas?: true
    parcelasRestantes?: true
  }

  export type VendaSumAggregateInputType = {
    id?: true
    clienteId?: true
    valorTotal?: true
    entrada?: true
    numParcelas?: true
    parcelasRestantes?: true
  }

  export type VendaMinAggregateInputType = {
    id?: true
    clienteId?: true
    dataVenda?: true
    tipoPagamento?: true
    valorTotal?: true
    entrada?: true
    numParcelas?: true
    parcelasRestantes?: true
  }

  export type VendaMaxAggregateInputType = {
    id?: true
    clienteId?: true
    dataVenda?: true
    tipoPagamento?: true
    valorTotal?: true
    entrada?: true
    numParcelas?: true
    parcelasRestantes?: true
  }

  export type VendaCountAggregateInputType = {
    id?: true
    clienteId?: true
    dataVenda?: true
    tipoPagamento?: true
    valorTotal?: true
    entrada?: true
    numParcelas?: true
    parcelasRestantes?: true
    _all?: true
  }

  export type VendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venda to aggregate.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendas
    **/
    _count?: true | VendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendaMaxAggregateInputType
  }

  export type GetVendaAggregateType<T extends VendaAggregateArgs> = {
        [P in keyof T & keyof AggregateVenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenda[P]>
      : GetScalarType<T[P], AggregateVenda[P]>
  }




  export type VendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaWhereInput
    orderBy?: VendaOrderByWithAggregationInput | VendaOrderByWithAggregationInput[]
    by: VendaScalarFieldEnum[] | VendaScalarFieldEnum
    having?: VendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendaCountAggregateInputType | true
    _avg?: VendaAvgAggregateInputType
    _sum?: VendaSumAggregateInputType
    _min?: VendaMinAggregateInputType
    _max?: VendaMaxAggregateInputType
  }

  export type VendaGroupByOutputType = {
    id: number
    clienteId: number
    dataVenda: Date
    tipoPagamento: string
    valorTotal: number
    entrada: number | null
    numParcelas: number | null
    parcelasRestantes: number | null
    _count: VendaCountAggregateOutputType | null
    _avg: VendaAvgAggregateOutputType | null
    _sum: VendaSumAggregateOutputType | null
    _min: VendaMinAggregateOutputType | null
    _max: VendaMaxAggregateOutputType | null
  }

  type GetVendaGroupByPayload<T extends VendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendaGroupByOutputType[P]>
            : GetScalarType<T[P], VendaGroupByOutputType[P]>
        }
      >
    >


  export type VendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clienteId?: boolean
    dataVenda?: boolean
    tipoPagamento?: boolean
    valorTotal?: boolean
    entrada?: boolean
    numParcelas?: boolean
    parcelasRestantes?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    parcelas?: boolean | Venda$parcelasArgs<ExtArgs>
    _count?: boolean | VendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venda"]>



  export type VendaSelectScalar = {
    id?: boolean
    clienteId?: boolean
    dataVenda?: boolean
    tipoPagamento?: boolean
    valorTotal?: boolean
    entrada?: boolean
    numParcelas?: boolean
    parcelasRestantes?: boolean
  }

  export type VendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clienteId" | "dataVenda" | "tipoPagamento" | "valorTotal" | "entrada" | "numParcelas" | "parcelasRestantes", ExtArgs["result"]["venda"]>
  export type VendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    parcelas?: boolean | Venda$parcelasArgs<ExtArgs>
    _count?: boolean | VendaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $VendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venda"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      parcelas: Prisma.$ParcelaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clienteId: number
      dataVenda: Date
      tipoPagamento: string
      valorTotal: number
      entrada: number | null
      numParcelas: number | null
      parcelasRestantes: number | null
    }, ExtArgs["result"]["venda"]>
    composites: {}
  }

  type VendaGetPayload<S extends boolean | null | undefined | VendaDefaultArgs> = $Result.GetResult<Prisma.$VendaPayload, S>

  type VendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendaCountAggregateInputType | true
    }

  export interface VendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venda'], meta: { name: 'Venda' } }
    /**
     * Find zero or one Venda that matches the filter.
     * @param {VendaFindUniqueArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendaFindUniqueArgs>(args: SelectSubset<T, VendaFindUniqueArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendaFindUniqueOrThrowArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendaFindUniqueOrThrowArgs>(args: SelectSubset<T, VendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindFirstArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendaFindFirstArgs>(args?: SelectSubset<T, VendaFindFirstArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindFirstOrThrowArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendaFindFirstOrThrowArgs>(args?: SelectSubset<T, VendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendas
     * const vendas = await prisma.venda.findMany()
     * 
     * // Get first 10 Vendas
     * const vendas = await prisma.venda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendaWithIdOnly = await prisma.venda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendaFindManyArgs>(args?: SelectSubset<T, VendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venda.
     * @param {VendaCreateArgs} args - Arguments to create a Venda.
     * @example
     * // Create one Venda
     * const Venda = await prisma.venda.create({
     *   data: {
     *     // ... data to create a Venda
     *   }
     * })
     * 
     */
    create<T extends VendaCreateArgs>(args: SelectSubset<T, VendaCreateArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendas.
     * @param {VendaCreateManyArgs} args - Arguments to create many Vendas.
     * @example
     * // Create many Vendas
     * const venda = await prisma.venda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendaCreateManyArgs>(args?: SelectSubset<T, VendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Venda.
     * @param {VendaDeleteArgs} args - Arguments to delete one Venda.
     * @example
     * // Delete one Venda
     * const Venda = await prisma.venda.delete({
     *   where: {
     *     // ... filter to delete one Venda
     *   }
     * })
     * 
     */
    delete<T extends VendaDeleteArgs>(args: SelectSubset<T, VendaDeleteArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venda.
     * @param {VendaUpdateArgs} args - Arguments to update one Venda.
     * @example
     * // Update one Venda
     * const venda = await prisma.venda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendaUpdateArgs>(args: SelectSubset<T, VendaUpdateArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendas.
     * @param {VendaDeleteManyArgs} args - Arguments to filter Vendas to delete.
     * @example
     * // Delete a few Vendas
     * const { count } = await prisma.venda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendaDeleteManyArgs>(args?: SelectSubset<T, VendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendas
     * const venda = await prisma.venda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendaUpdateManyArgs>(args: SelectSubset<T, VendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Venda.
     * @param {VendaUpsertArgs} args - Arguments to update or create a Venda.
     * @example
     * // Update or create a Venda
     * const venda = await prisma.venda.upsert({
     *   create: {
     *     // ... data to create a Venda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venda we want to update
     *   }
     * })
     */
    upsert<T extends VendaUpsertArgs>(args: SelectSubset<T, VendaUpsertArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaCountArgs} args - Arguments to filter Vendas to count.
     * @example
     * // Count the number of Vendas
     * const count = await prisma.venda.count({
     *   where: {
     *     // ... the filter for the Vendas we want to count
     *   }
     * })
    **/
    count<T extends VendaCountArgs>(
      args?: Subset<T, VendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendaAggregateArgs>(args: Subset<T, VendaAggregateArgs>): Prisma.PrismaPromise<GetVendaAggregateType<T>>

    /**
     * Group by Venda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendaGroupByArgs['orderBy'] }
        : { orderBy?: VendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venda model
   */
  readonly fields: VendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parcelas<T extends Venda$parcelasArgs<ExtArgs> = {}>(args?: Subset<T, Venda$parcelasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venda model
   */
  interface VendaFieldRefs {
    readonly id: FieldRef<"Venda", 'Int'>
    readonly clienteId: FieldRef<"Venda", 'Int'>
    readonly dataVenda: FieldRef<"Venda", 'DateTime'>
    readonly tipoPagamento: FieldRef<"Venda", 'String'>
    readonly valorTotal: FieldRef<"Venda", 'Float'>
    readonly entrada: FieldRef<"Venda", 'Float'>
    readonly numParcelas: FieldRef<"Venda", 'Int'>
    readonly parcelasRestantes: FieldRef<"Venda", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Venda findUnique
   */
  export type VendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda findUniqueOrThrow
   */
  export type VendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda findFirst
   */
  export type VendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendas.
     */
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda findFirstOrThrow
   */
  export type VendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendas.
     */
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda findMany
   */
  export type VendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Vendas to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda create
   */
  export type VendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Venda.
     */
    data: XOR<VendaCreateInput, VendaUncheckedCreateInput>
  }

  /**
   * Venda createMany
   */
  export type VendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendas.
     */
    data: VendaCreateManyInput | VendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venda update
   */
  export type VendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Venda.
     */
    data: XOR<VendaUpdateInput, VendaUncheckedUpdateInput>
    /**
     * Choose, which Venda to update.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda updateMany
   */
  export type VendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendas.
     */
    data: XOR<VendaUpdateManyMutationInput, VendaUncheckedUpdateManyInput>
    /**
     * Filter which Vendas to update
     */
    where?: VendaWhereInput
    /**
     * Limit how many Vendas to update.
     */
    limit?: number
  }

  /**
   * Venda upsert
   */
  export type VendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Venda to update in case it exists.
     */
    where: VendaWhereUniqueInput
    /**
     * In case the Venda found by the `where` argument doesn't exist, create a new Venda with this data.
     */
    create: XOR<VendaCreateInput, VendaUncheckedCreateInput>
    /**
     * In case the Venda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendaUpdateInput, VendaUncheckedUpdateInput>
  }

  /**
   * Venda delete
   */
  export type VendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter which Venda to delete.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda deleteMany
   */
  export type VendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendas to delete
     */
    where?: VendaWhereInput
    /**
     * Limit how many Vendas to delete.
     */
    limit?: number
  }

  /**
   * Venda.parcelas
   */
  export type Venda$parcelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    where?: ParcelaWhereInput
    orderBy?: ParcelaOrderByWithRelationInput | ParcelaOrderByWithRelationInput[]
    cursor?: ParcelaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParcelaScalarFieldEnum | ParcelaScalarFieldEnum[]
  }

  /**
   * Venda without action
   */
  export type VendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
  }


  /**
   * Model Parcela
   */

  export type AggregateParcela = {
    _count: ParcelaCountAggregateOutputType | null
    _avg: ParcelaAvgAggregateOutputType | null
    _sum: ParcelaSumAggregateOutputType | null
    _min: ParcelaMinAggregateOutputType | null
    _max: ParcelaMaxAggregateOutputType | null
  }

  export type ParcelaAvgAggregateOutputType = {
    id: number | null
    vendaId: number | null
    numParcela: number | null
    valorParcela: number | null
  }

  export type ParcelaSumAggregateOutputType = {
    id: number | null
    vendaId: number | null
    numParcela: number | null
    valorParcela: number | null
  }

  export type ParcelaMinAggregateOutputType = {
    id: number | null
    vendaId: number | null
    numParcela: number | null
    valorParcela: number | null
    dataVencimento: Date | null
    pago: boolean | null
    dataPagamento: Date | null
  }

  export type ParcelaMaxAggregateOutputType = {
    id: number | null
    vendaId: number | null
    numParcela: number | null
    valorParcela: number | null
    dataVencimento: Date | null
    pago: boolean | null
    dataPagamento: Date | null
  }

  export type ParcelaCountAggregateOutputType = {
    id: number
    vendaId: number
    numParcela: number
    valorParcela: number
    dataVencimento: number
    pago: number
    dataPagamento: number
    _all: number
  }


  export type ParcelaAvgAggregateInputType = {
    id?: true
    vendaId?: true
    numParcela?: true
    valorParcela?: true
  }

  export type ParcelaSumAggregateInputType = {
    id?: true
    vendaId?: true
    numParcela?: true
    valorParcela?: true
  }

  export type ParcelaMinAggregateInputType = {
    id?: true
    vendaId?: true
    numParcela?: true
    valorParcela?: true
    dataVencimento?: true
    pago?: true
    dataPagamento?: true
  }

  export type ParcelaMaxAggregateInputType = {
    id?: true
    vendaId?: true
    numParcela?: true
    valorParcela?: true
    dataVencimento?: true
    pago?: true
    dataPagamento?: true
  }

  export type ParcelaCountAggregateInputType = {
    id?: true
    vendaId?: true
    numParcela?: true
    valorParcela?: true
    dataVencimento?: true
    pago?: true
    dataPagamento?: true
    _all?: true
  }

  export type ParcelaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parcela to aggregate.
     */
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     */
    orderBy?: ParcelaOrderByWithRelationInput | ParcelaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parcelas
    **/
    _count?: true | ParcelaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParcelaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParcelaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParcelaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParcelaMaxAggregateInputType
  }

  export type GetParcelaAggregateType<T extends ParcelaAggregateArgs> = {
        [P in keyof T & keyof AggregateParcela]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParcela[P]>
      : GetScalarType<T[P], AggregateParcela[P]>
  }




  export type ParcelaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParcelaWhereInput
    orderBy?: ParcelaOrderByWithAggregationInput | ParcelaOrderByWithAggregationInput[]
    by: ParcelaScalarFieldEnum[] | ParcelaScalarFieldEnum
    having?: ParcelaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParcelaCountAggregateInputType | true
    _avg?: ParcelaAvgAggregateInputType
    _sum?: ParcelaSumAggregateInputType
    _min?: ParcelaMinAggregateInputType
    _max?: ParcelaMaxAggregateInputType
  }

  export type ParcelaGroupByOutputType = {
    id: number
    vendaId: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date
    pago: boolean
    dataPagamento: Date | null
    _count: ParcelaCountAggregateOutputType | null
    _avg: ParcelaAvgAggregateOutputType | null
    _sum: ParcelaSumAggregateOutputType | null
    _min: ParcelaMinAggregateOutputType | null
    _max: ParcelaMaxAggregateOutputType | null
  }

  type GetParcelaGroupByPayload<T extends ParcelaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParcelaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParcelaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParcelaGroupByOutputType[P]>
            : GetScalarType<T[P], ParcelaGroupByOutputType[P]>
        }
      >
    >


  export type ParcelaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendaId?: boolean
    numParcela?: boolean
    valorParcela?: boolean
    dataVencimento?: boolean
    pago?: boolean
    dataPagamento?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    comprovante?: boolean | Parcela$comprovanteArgs<ExtArgs>
  }, ExtArgs["result"]["parcela"]>



  export type ParcelaSelectScalar = {
    id?: boolean
    vendaId?: boolean
    numParcela?: boolean
    valorParcela?: boolean
    dataVencimento?: boolean
    pago?: boolean
    dataPagamento?: boolean
  }

  export type ParcelaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "vendaId" | "numParcela" | "valorParcela" | "dataVencimento" | "pago" | "dataPagamento", ExtArgs["result"]["parcela"]>
  export type ParcelaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    comprovante?: boolean | Parcela$comprovanteArgs<ExtArgs>
  }

  export type $ParcelaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parcela"
    objects: {
      venda: Prisma.$VendaPayload<ExtArgs>
      comprovante: Prisma.$ComprovantePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vendaId: number
      numParcela: number
      valorParcela: number
      dataVencimento: Date
      pago: boolean
      dataPagamento: Date | null
    }, ExtArgs["result"]["parcela"]>
    composites: {}
  }

  type ParcelaGetPayload<S extends boolean | null | undefined | ParcelaDefaultArgs> = $Result.GetResult<Prisma.$ParcelaPayload, S>

  type ParcelaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParcelaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParcelaCountAggregateInputType | true
    }

  export interface ParcelaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parcela'], meta: { name: 'Parcela' } }
    /**
     * Find zero or one Parcela that matches the filter.
     * @param {ParcelaFindUniqueArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParcelaFindUniqueArgs>(args: SelectSubset<T, ParcelaFindUniqueArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parcela that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParcelaFindUniqueOrThrowArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParcelaFindUniqueOrThrowArgs>(args: SelectSubset<T, ParcelaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parcela that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindFirstArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParcelaFindFirstArgs>(args?: SelectSubset<T, ParcelaFindFirstArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parcela that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindFirstOrThrowArgs} args - Arguments to find a Parcela
     * @example
     * // Get one Parcela
     * const parcela = await prisma.parcela.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParcelaFindFirstOrThrowArgs>(args?: SelectSubset<T, ParcelaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parcelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parcelas
     * const parcelas = await prisma.parcela.findMany()
     * 
     * // Get first 10 Parcelas
     * const parcelas = await prisma.parcela.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parcelaWithIdOnly = await prisma.parcela.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParcelaFindManyArgs>(args?: SelectSubset<T, ParcelaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parcela.
     * @param {ParcelaCreateArgs} args - Arguments to create a Parcela.
     * @example
     * // Create one Parcela
     * const Parcela = await prisma.parcela.create({
     *   data: {
     *     // ... data to create a Parcela
     *   }
     * })
     * 
     */
    create<T extends ParcelaCreateArgs>(args: SelectSubset<T, ParcelaCreateArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parcelas.
     * @param {ParcelaCreateManyArgs} args - Arguments to create many Parcelas.
     * @example
     * // Create many Parcelas
     * const parcela = await prisma.parcela.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParcelaCreateManyArgs>(args?: SelectSubset<T, ParcelaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Parcela.
     * @param {ParcelaDeleteArgs} args - Arguments to delete one Parcela.
     * @example
     * // Delete one Parcela
     * const Parcela = await prisma.parcela.delete({
     *   where: {
     *     // ... filter to delete one Parcela
     *   }
     * })
     * 
     */
    delete<T extends ParcelaDeleteArgs>(args: SelectSubset<T, ParcelaDeleteArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parcela.
     * @param {ParcelaUpdateArgs} args - Arguments to update one Parcela.
     * @example
     * // Update one Parcela
     * const parcela = await prisma.parcela.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParcelaUpdateArgs>(args: SelectSubset<T, ParcelaUpdateArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parcelas.
     * @param {ParcelaDeleteManyArgs} args - Arguments to filter Parcelas to delete.
     * @example
     * // Delete a few Parcelas
     * const { count } = await prisma.parcela.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParcelaDeleteManyArgs>(args?: SelectSubset<T, ParcelaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parcelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parcelas
     * const parcela = await prisma.parcela.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParcelaUpdateManyArgs>(args: SelectSubset<T, ParcelaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Parcela.
     * @param {ParcelaUpsertArgs} args - Arguments to update or create a Parcela.
     * @example
     * // Update or create a Parcela
     * const parcela = await prisma.parcela.upsert({
     *   create: {
     *     // ... data to create a Parcela
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parcela we want to update
     *   }
     * })
     */
    upsert<T extends ParcelaUpsertArgs>(args: SelectSubset<T, ParcelaUpsertArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parcelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaCountArgs} args - Arguments to filter Parcelas to count.
     * @example
     * // Count the number of Parcelas
     * const count = await prisma.parcela.count({
     *   where: {
     *     // ... the filter for the Parcelas we want to count
     *   }
     * })
    **/
    count<T extends ParcelaCountArgs>(
      args?: Subset<T, ParcelaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParcelaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parcela.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParcelaAggregateArgs>(args: Subset<T, ParcelaAggregateArgs>): Prisma.PrismaPromise<GetParcelaAggregateType<T>>

    /**
     * Group by Parcela.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParcelaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParcelaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParcelaGroupByArgs['orderBy'] }
        : { orderBy?: ParcelaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParcelaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParcelaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parcela model
   */
  readonly fields: ParcelaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parcela.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParcelaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venda<T extends VendaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendaDefaultArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comprovante<T extends Parcela$comprovanteArgs<ExtArgs> = {}>(args?: Subset<T, Parcela$comprovanteArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Parcela model
   */
  interface ParcelaFieldRefs {
    readonly id: FieldRef<"Parcela", 'Int'>
    readonly vendaId: FieldRef<"Parcela", 'Int'>
    readonly numParcela: FieldRef<"Parcela", 'Int'>
    readonly valorParcela: FieldRef<"Parcela", 'Float'>
    readonly dataVencimento: FieldRef<"Parcela", 'DateTime'>
    readonly pago: FieldRef<"Parcela", 'Boolean'>
    readonly dataPagamento: FieldRef<"Parcela", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Parcela findUnique
   */
  export type ParcelaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter, which Parcela to fetch.
     */
    where: ParcelaWhereUniqueInput
  }

  /**
   * Parcela findUniqueOrThrow
   */
  export type ParcelaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter, which Parcela to fetch.
     */
    where: ParcelaWhereUniqueInput
  }

  /**
   * Parcela findFirst
   */
  export type ParcelaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter, which Parcela to fetch.
     */
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     */
    orderBy?: ParcelaOrderByWithRelationInput | ParcelaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parcelas.
     */
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parcelas.
     */
    distinct?: ParcelaScalarFieldEnum | ParcelaScalarFieldEnum[]
  }

  /**
   * Parcela findFirstOrThrow
   */
  export type ParcelaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter, which Parcela to fetch.
     */
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     */
    orderBy?: ParcelaOrderByWithRelationInput | ParcelaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parcelas.
     */
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parcelas.
     */
    distinct?: ParcelaScalarFieldEnum | ParcelaScalarFieldEnum[]
  }

  /**
   * Parcela findMany
   */
  export type ParcelaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter, which Parcelas to fetch.
     */
    where?: ParcelaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parcelas to fetch.
     */
    orderBy?: ParcelaOrderByWithRelationInput | ParcelaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parcelas.
     */
    cursor?: ParcelaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parcelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parcelas.
     */
    skip?: number
    distinct?: ParcelaScalarFieldEnum | ParcelaScalarFieldEnum[]
  }

  /**
   * Parcela create
   */
  export type ParcelaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * The data needed to create a Parcela.
     */
    data: XOR<ParcelaCreateInput, ParcelaUncheckedCreateInput>
  }

  /**
   * Parcela createMany
   */
  export type ParcelaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parcelas.
     */
    data: ParcelaCreateManyInput | ParcelaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parcela update
   */
  export type ParcelaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * The data needed to update a Parcela.
     */
    data: XOR<ParcelaUpdateInput, ParcelaUncheckedUpdateInput>
    /**
     * Choose, which Parcela to update.
     */
    where: ParcelaWhereUniqueInput
  }

  /**
   * Parcela updateMany
   */
  export type ParcelaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parcelas.
     */
    data: XOR<ParcelaUpdateManyMutationInput, ParcelaUncheckedUpdateManyInput>
    /**
     * Filter which Parcelas to update
     */
    where?: ParcelaWhereInput
    /**
     * Limit how many Parcelas to update.
     */
    limit?: number
  }

  /**
   * Parcela upsert
   */
  export type ParcelaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * The filter to search for the Parcela to update in case it exists.
     */
    where: ParcelaWhereUniqueInput
    /**
     * In case the Parcela found by the `where` argument doesn't exist, create a new Parcela with this data.
     */
    create: XOR<ParcelaCreateInput, ParcelaUncheckedCreateInput>
    /**
     * In case the Parcela was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParcelaUpdateInput, ParcelaUncheckedUpdateInput>
  }

  /**
   * Parcela delete
   */
  export type ParcelaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
    /**
     * Filter which Parcela to delete.
     */
    where: ParcelaWhereUniqueInput
  }

  /**
   * Parcela deleteMany
   */
  export type ParcelaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parcelas to delete
     */
    where?: ParcelaWhereInput
    /**
     * Limit how many Parcelas to delete.
     */
    limit?: number
  }

  /**
   * Parcela.comprovante
   */
  export type Parcela$comprovanteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    where?: ComprovanteWhereInput
  }

  /**
   * Parcela without action
   */
  export type ParcelaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parcela
     */
    select?: ParcelaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parcela
     */
    omit?: ParcelaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParcelaInclude<ExtArgs> | null
  }


  /**
   * Model Comprovante
   */

  export type AggregateComprovante = {
    _count: ComprovanteCountAggregateOutputType | null
    _avg: ComprovanteAvgAggregateOutputType | null
    _sum: ComprovanteSumAggregateOutputType | null
    _min: ComprovanteMinAggregateOutputType | null
    _max: ComprovanteMaxAggregateOutputType | null
  }

  export type ComprovanteAvgAggregateOutputType = {
    id: number | null
    parcelaId: number | null
  }

  export type ComprovanteSumAggregateOutputType = {
    id: number | null
    parcelaId: number | null
  }

  export type ComprovanteMinAggregateOutputType = {
    id: number | null
    parcelaId: number | null
    arquivoPath: string | null
    dataUpload: Date | null
    recebidoPor: string | null
  }

  export type ComprovanteMaxAggregateOutputType = {
    id: number | null
    parcelaId: number | null
    arquivoPath: string | null
    dataUpload: Date | null
    recebidoPor: string | null
  }

  export type ComprovanteCountAggregateOutputType = {
    id: number
    parcelaId: number
    arquivoPath: number
    dataUpload: number
    recebidoPor: number
    _all: number
  }


  export type ComprovanteAvgAggregateInputType = {
    id?: true
    parcelaId?: true
  }

  export type ComprovanteSumAggregateInputType = {
    id?: true
    parcelaId?: true
  }

  export type ComprovanteMinAggregateInputType = {
    id?: true
    parcelaId?: true
    arquivoPath?: true
    dataUpload?: true
    recebidoPor?: true
  }

  export type ComprovanteMaxAggregateInputType = {
    id?: true
    parcelaId?: true
    arquivoPath?: true
    dataUpload?: true
    recebidoPor?: true
  }

  export type ComprovanteCountAggregateInputType = {
    id?: true
    parcelaId?: true
    arquivoPath?: true
    dataUpload?: true
    recebidoPor?: true
    _all?: true
  }

  export type ComprovanteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comprovante to aggregate.
     */
    where?: ComprovanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comprovantes to fetch.
     */
    orderBy?: ComprovanteOrderByWithRelationInput | ComprovanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComprovanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comprovantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comprovantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comprovantes
    **/
    _count?: true | ComprovanteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComprovanteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComprovanteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComprovanteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComprovanteMaxAggregateInputType
  }

  export type GetComprovanteAggregateType<T extends ComprovanteAggregateArgs> = {
        [P in keyof T & keyof AggregateComprovante]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComprovante[P]>
      : GetScalarType<T[P], AggregateComprovante[P]>
  }




  export type ComprovanteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComprovanteWhereInput
    orderBy?: ComprovanteOrderByWithAggregationInput | ComprovanteOrderByWithAggregationInput[]
    by: ComprovanteScalarFieldEnum[] | ComprovanteScalarFieldEnum
    having?: ComprovanteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComprovanteCountAggregateInputType | true
    _avg?: ComprovanteAvgAggregateInputType
    _sum?: ComprovanteSumAggregateInputType
    _min?: ComprovanteMinAggregateInputType
    _max?: ComprovanteMaxAggregateInputType
  }

  export type ComprovanteGroupByOutputType = {
    id: number
    parcelaId: number
    arquivoPath: string
    dataUpload: Date
    recebidoPor: string
    _count: ComprovanteCountAggregateOutputType | null
    _avg: ComprovanteAvgAggregateOutputType | null
    _sum: ComprovanteSumAggregateOutputType | null
    _min: ComprovanteMinAggregateOutputType | null
    _max: ComprovanteMaxAggregateOutputType | null
  }

  type GetComprovanteGroupByPayload<T extends ComprovanteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComprovanteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComprovanteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComprovanteGroupByOutputType[P]>
            : GetScalarType<T[P], ComprovanteGroupByOutputType[P]>
        }
      >
    >


  export type ComprovanteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parcelaId?: boolean
    arquivoPath?: boolean
    dataUpload?: boolean
    recebidoPor?: boolean
    parcela?: boolean | ParcelaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comprovante"]>



  export type ComprovanteSelectScalar = {
    id?: boolean
    parcelaId?: boolean
    arquivoPath?: boolean
    dataUpload?: boolean
    recebidoPor?: boolean
  }

  export type ComprovanteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parcelaId" | "arquivoPath" | "dataUpload" | "recebidoPor", ExtArgs["result"]["comprovante"]>
  export type ComprovanteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parcela?: boolean | ParcelaDefaultArgs<ExtArgs>
  }

  export type $ComprovantePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comprovante"
    objects: {
      parcela: Prisma.$ParcelaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      parcelaId: number
      arquivoPath: string
      dataUpload: Date
      recebidoPor: string
    }, ExtArgs["result"]["comprovante"]>
    composites: {}
  }

  type ComprovanteGetPayload<S extends boolean | null | undefined | ComprovanteDefaultArgs> = $Result.GetResult<Prisma.$ComprovantePayload, S>

  type ComprovanteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComprovanteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComprovanteCountAggregateInputType | true
    }

  export interface ComprovanteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comprovante'], meta: { name: 'Comprovante' } }
    /**
     * Find zero or one Comprovante that matches the filter.
     * @param {ComprovanteFindUniqueArgs} args - Arguments to find a Comprovante
     * @example
     * // Get one Comprovante
     * const comprovante = await prisma.comprovante.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComprovanteFindUniqueArgs>(args: SelectSubset<T, ComprovanteFindUniqueArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comprovante that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComprovanteFindUniqueOrThrowArgs} args - Arguments to find a Comprovante
     * @example
     * // Get one Comprovante
     * const comprovante = await prisma.comprovante.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComprovanteFindUniqueOrThrowArgs>(args: SelectSubset<T, ComprovanteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comprovante that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteFindFirstArgs} args - Arguments to find a Comprovante
     * @example
     * // Get one Comprovante
     * const comprovante = await prisma.comprovante.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComprovanteFindFirstArgs>(args?: SelectSubset<T, ComprovanteFindFirstArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comprovante that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteFindFirstOrThrowArgs} args - Arguments to find a Comprovante
     * @example
     * // Get one Comprovante
     * const comprovante = await prisma.comprovante.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComprovanteFindFirstOrThrowArgs>(args?: SelectSubset<T, ComprovanteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comprovantes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comprovantes
     * const comprovantes = await prisma.comprovante.findMany()
     * 
     * // Get first 10 Comprovantes
     * const comprovantes = await prisma.comprovante.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comprovanteWithIdOnly = await prisma.comprovante.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComprovanteFindManyArgs>(args?: SelectSubset<T, ComprovanteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comprovante.
     * @param {ComprovanteCreateArgs} args - Arguments to create a Comprovante.
     * @example
     * // Create one Comprovante
     * const Comprovante = await prisma.comprovante.create({
     *   data: {
     *     // ... data to create a Comprovante
     *   }
     * })
     * 
     */
    create<T extends ComprovanteCreateArgs>(args: SelectSubset<T, ComprovanteCreateArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comprovantes.
     * @param {ComprovanteCreateManyArgs} args - Arguments to create many Comprovantes.
     * @example
     * // Create many Comprovantes
     * const comprovante = await prisma.comprovante.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComprovanteCreateManyArgs>(args?: SelectSubset<T, ComprovanteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comprovante.
     * @param {ComprovanteDeleteArgs} args - Arguments to delete one Comprovante.
     * @example
     * // Delete one Comprovante
     * const Comprovante = await prisma.comprovante.delete({
     *   where: {
     *     // ... filter to delete one Comprovante
     *   }
     * })
     * 
     */
    delete<T extends ComprovanteDeleteArgs>(args: SelectSubset<T, ComprovanteDeleteArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comprovante.
     * @param {ComprovanteUpdateArgs} args - Arguments to update one Comprovante.
     * @example
     * // Update one Comprovante
     * const comprovante = await prisma.comprovante.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComprovanteUpdateArgs>(args: SelectSubset<T, ComprovanteUpdateArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comprovantes.
     * @param {ComprovanteDeleteManyArgs} args - Arguments to filter Comprovantes to delete.
     * @example
     * // Delete a few Comprovantes
     * const { count } = await prisma.comprovante.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComprovanteDeleteManyArgs>(args?: SelectSubset<T, ComprovanteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comprovantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comprovantes
     * const comprovante = await prisma.comprovante.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComprovanteUpdateManyArgs>(args: SelectSubset<T, ComprovanteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comprovante.
     * @param {ComprovanteUpsertArgs} args - Arguments to update or create a Comprovante.
     * @example
     * // Update or create a Comprovante
     * const comprovante = await prisma.comprovante.upsert({
     *   create: {
     *     // ... data to create a Comprovante
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comprovante we want to update
     *   }
     * })
     */
    upsert<T extends ComprovanteUpsertArgs>(args: SelectSubset<T, ComprovanteUpsertArgs<ExtArgs>>): Prisma__ComprovanteClient<$Result.GetResult<Prisma.$ComprovantePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comprovantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteCountArgs} args - Arguments to filter Comprovantes to count.
     * @example
     * // Count the number of Comprovantes
     * const count = await prisma.comprovante.count({
     *   where: {
     *     // ... the filter for the Comprovantes we want to count
     *   }
     * })
    **/
    count<T extends ComprovanteCountArgs>(
      args?: Subset<T, ComprovanteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComprovanteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comprovante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComprovanteAggregateArgs>(args: Subset<T, ComprovanteAggregateArgs>): Prisma.PrismaPromise<GetComprovanteAggregateType<T>>

    /**
     * Group by Comprovante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComprovanteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComprovanteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComprovanteGroupByArgs['orderBy'] }
        : { orderBy?: ComprovanteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComprovanteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComprovanteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comprovante model
   */
  readonly fields: ComprovanteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comprovante.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComprovanteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parcela<T extends ParcelaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ParcelaDefaultArgs<ExtArgs>>): Prisma__ParcelaClient<$Result.GetResult<Prisma.$ParcelaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comprovante model
   */
  interface ComprovanteFieldRefs {
    readonly id: FieldRef<"Comprovante", 'Int'>
    readonly parcelaId: FieldRef<"Comprovante", 'Int'>
    readonly arquivoPath: FieldRef<"Comprovante", 'String'>
    readonly dataUpload: FieldRef<"Comprovante", 'DateTime'>
    readonly recebidoPor: FieldRef<"Comprovante", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comprovante findUnique
   */
  export type ComprovanteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter, which Comprovante to fetch.
     */
    where: ComprovanteWhereUniqueInput
  }

  /**
   * Comprovante findUniqueOrThrow
   */
  export type ComprovanteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter, which Comprovante to fetch.
     */
    where: ComprovanteWhereUniqueInput
  }

  /**
   * Comprovante findFirst
   */
  export type ComprovanteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter, which Comprovante to fetch.
     */
    where?: ComprovanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comprovantes to fetch.
     */
    orderBy?: ComprovanteOrderByWithRelationInput | ComprovanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comprovantes.
     */
    cursor?: ComprovanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comprovantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comprovantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comprovantes.
     */
    distinct?: ComprovanteScalarFieldEnum | ComprovanteScalarFieldEnum[]
  }

  /**
   * Comprovante findFirstOrThrow
   */
  export type ComprovanteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter, which Comprovante to fetch.
     */
    where?: ComprovanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comprovantes to fetch.
     */
    orderBy?: ComprovanteOrderByWithRelationInput | ComprovanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comprovantes.
     */
    cursor?: ComprovanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comprovantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comprovantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comprovantes.
     */
    distinct?: ComprovanteScalarFieldEnum | ComprovanteScalarFieldEnum[]
  }

  /**
   * Comprovante findMany
   */
  export type ComprovanteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter, which Comprovantes to fetch.
     */
    where?: ComprovanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comprovantes to fetch.
     */
    orderBy?: ComprovanteOrderByWithRelationInput | ComprovanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comprovantes.
     */
    cursor?: ComprovanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comprovantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comprovantes.
     */
    skip?: number
    distinct?: ComprovanteScalarFieldEnum | ComprovanteScalarFieldEnum[]
  }

  /**
   * Comprovante create
   */
  export type ComprovanteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * The data needed to create a Comprovante.
     */
    data: XOR<ComprovanteCreateInput, ComprovanteUncheckedCreateInput>
  }

  /**
   * Comprovante createMany
   */
  export type ComprovanteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comprovantes.
     */
    data: ComprovanteCreateManyInput | ComprovanteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comprovante update
   */
  export type ComprovanteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * The data needed to update a Comprovante.
     */
    data: XOR<ComprovanteUpdateInput, ComprovanteUncheckedUpdateInput>
    /**
     * Choose, which Comprovante to update.
     */
    where: ComprovanteWhereUniqueInput
  }

  /**
   * Comprovante updateMany
   */
  export type ComprovanteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comprovantes.
     */
    data: XOR<ComprovanteUpdateManyMutationInput, ComprovanteUncheckedUpdateManyInput>
    /**
     * Filter which Comprovantes to update
     */
    where?: ComprovanteWhereInput
    /**
     * Limit how many Comprovantes to update.
     */
    limit?: number
  }

  /**
   * Comprovante upsert
   */
  export type ComprovanteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * The filter to search for the Comprovante to update in case it exists.
     */
    where: ComprovanteWhereUniqueInput
    /**
     * In case the Comprovante found by the `where` argument doesn't exist, create a new Comprovante with this data.
     */
    create: XOR<ComprovanteCreateInput, ComprovanteUncheckedCreateInput>
    /**
     * In case the Comprovante was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComprovanteUpdateInput, ComprovanteUncheckedUpdateInput>
  }

  /**
   * Comprovante delete
   */
  export type ComprovanteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
    /**
     * Filter which Comprovante to delete.
     */
    where: ComprovanteWhereUniqueInput
  }

  /**
   * Comprovante deleteMany
   */
  export type ComprovanteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comprovantes to delete
     */
    where?: ComprovanteWhereInput
    /**
     * Limit how many Comprovantes to delete.
     */
    limit?: number
  }

  /**
   * Comprovante without action
   */
  export type ComprovanteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comprovante
     */
    select?: ComprovanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comprovante
     */
    omit?: ComprovanteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComprovanteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    telefone: 'telefone',
    endereco: 'endereco',
    senha: 'senha',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    telefone: 'telefone',
    cpf: 'cpf',
    endereco: 'endereco',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const MercadoriaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    valorUnitario: 'valorUnitario',
    quantidadeEstoque: 'quantidadeEstoque',
    descricao: 'descricao',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MercadoriaScalarFieldEnum = (typeof MercadoriaScalarFieldEnum)[keyof typeof MercadoriaScalarFieldEnum]


  export const FotoScalarFieldEnum: {
    id: 'id',
    mercadoriaId: 'mercadoriaId',
    path: 'path'
  };

  export type FotoScalarFieldEnum = (typeof FotoScalarFieldEnum)[keyof typeof FotoScalarFieldEnum]


  export const VendaScalarFieldEnum: {
    id: 'id',
    clienteId: 'clienteId',
    dataVenda: 'dataVenda',
    tipoPagamento: 'tipoPagamento',
    valorTotal: 'valorTotal',
    entrada: 'entrada',
    numParcelas: 'numParcelas',
    parcelasRestantes: 'parcelasRestantes'
  };

  export type VendaScalarFieldEnum = (typeof VendaScalarFieldEnum)[keyof typeof VendaScalarFieldEnum]


  export const ParcelaScalarFieldEnum: {
    id: 'id',
    vendaId: 'vendaId',
    numParcela: 'numParcela',
    valorParcela: 'valorParcela',
    dataVencimento: 'dataVencimento',
    pago: 'pago',
    dataPagamento: 'dataPagamento'
  };

  export type ParcelaScalarFieldEnum = (typeof ParcelaScalarFieldEnum)[keyof typeof ParcelaScalarFieldEnum]


  export const ComprovanteScalarFieldEnum: {
    id: 'id',
    parcelaId: 'parcelaId',
    arquivoPath: 'arquivoPath',
    dataUpload: 'dataUpload',
    recebidoPor: 'recebidoPor'
  };

  export type ComprovanteScalarFieldEnum = (typeof ComprovanteScalarFieldEnum)[keyof typeof ComprovanteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    nome: 'nome',
    email: 'email',
    telefone: 'telefone',
    endereco: 'endereco',
    senha: 'senha'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ClienteOrderByRelevanceFieldEnum: {
    nome: 'nome',
    telefone: 'telefone',
    cpf: 'cpf',
    endereco: 'endereco'
  };

  export type ClienteOrderByRelevanceFieldEnum = (typeof ClienteOrderByRelevanceFieldEnum)[keyof typeof ClienteOrderByRelevanceFieldEnum]


  export const MercadoriaOrderByRelevanceFieldEnum: {
    nome: 'nome',
    descricao: 'descricao'
  };

  export type MercadoriaOrderByRelevanceFieldEnum = (typeof MercadoriaOrderByRelevanceFieldEnum)[keyof typeof MercadoriaOrderByRelevanceFieldEnum]


  export const FotoOrderByRelevanceFieldEnum: {
    path: 'path'
  };

  export type FotoOrderByRelevanceFieldEnum = (typeof FotoOrderByRelevanceFieldEnum)[keyof typeof FotoOrderByRelevanceFieldEnum]


  export const VendaOrderByRelevanceFieldEnum: {
    tipoPagamento: 'tipoPagamento'
  };

  export type VendaOrderByRelevanceFieldEnum = (typeof VendaOrderByRelevanceFieldEnum)[keyof typeof VendaOrderByRelevanceFieldEnum]


  export const ComprovanteOrderByRelevanceFieldEnum: {
    arquivoPath: 'arquivoPath',
    recebidoPor: 'recebidoPor'
  };

  export type ComprovanteOrderByRelevanceFieldEnum = (typeof ComprovanteOrderByRelevanceFieldEnum)[keyof typeof ComprovanteOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    telefone?: StringFilter<"User"> | string
    endereco?: StringNullableFilter<"User"> | string | null
    senha?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    endereco?: SortOrderInput | SortOrder
    senha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    telefone?: StringFilter<"User"> | string
    endereco?: StringNullableFilter<"User"> | string | null
    senha?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    endereco?: SortOrderInput | SortOrder
    senha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    telefone?: StringWithAggregatesFilter<"User"> | string
    endereco?: StringNullableWithAggregatesFilter<"User"> | string | null
    senha?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: IntFilter<"Cliente"> | number
    nome?: StringFilter<"Cliente"> | string
    telefone?: StringFilter<"Cliente"> | string
    cpf?: StringFilter<"Cliente"> | string
    endereco?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    vendas?: VendaListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    cpf?: SortOrder
    endereco?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendas?: VendaOrderByRelationAggregateInput
    _relevance?: ClienteOrderByRelevanceInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cpf?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nome?: StringFilter<"Cliente"> | string
    telefone?: StringFilter<"Cliente"> | string
    endereco?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    vendas?: VendaListRelationFilter
  }, "id" | "cpf">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    cpf?: SortOrder
    endereco?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _avg?: ClienteAvgOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
    _sum?: ClienteSumOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cliente"> | number
    nome?: StringWithAggregatesFilter<"Cliente"> | string
    telefone?: StringWithAggregatesFilter<"Cliente"> | string
    cpf?: StringWithAggregatesFilter<"Cliente"> | string
    endereco?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type MercadoriaWhereInput = {
    AND?: MercadoriaWhereInput | MercadoriaWhereInput[]
    OR?: MercadoriaWhereInput[]
    NOT?: MercadoriaWhereInput | MercadoriaWhereInput[]
    id?: IntFilter<"Mercadoria"> | number
    nome?: StringFilter<"Mercadoria"> | string
    valorUnitario?: FloatFilter<"Mercadoria"> | number
    quantidadeEstoque?: IntFilter<"Mercadoria"> | number
    descricao?: StringNullableFilter<"Mercadoria"> | string | null
    createdAt?: DateTimeFilter<"Mercadoria"> | Date | string
    updatedAt?: DateTimeFilter<"Mercadoria"> | Date | string
    fotos?: FotoListRelationFilter
  }

  export type MercadoriaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
    descricao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fotos?: FotoOrderByRelationAggregateInput
    _relevance?: MercadoriaOrderByRelevanceInput
  }

  export type MercadoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MercadoriaWhereInput | MercadoriaWhereInput[]
    OR?: MercadoriaWhereInput[]
    NOT?: MercadoriaWhereInput | MercadoriaWhereInput[]
    nome?: StringFilter<"Mercadoria"> | string
    valorUnitario?: FloatFilter<"Mercadoria"> | number
    quantidadeEstoque?: IntFilter<"Mercadoria"> | number
    descricao?: StringNullableFilter<"Mercadoria"> | string | null
    createdAt?: DateTimeFilter<"Mercadoria"> | Date | string
    updatedAt?: DateTimeFilter<"Mercadoria"> | Date | string
    fotos?: FotoListRelationFilter
  }, "id">

  export type MercadoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
    descricao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MercadoriaCountOrderByAggregateInput
    _avg?: MercadoriaAvgOrderByAggregateInput
    _max?: MercadoriaMaxOrderByAggregateInput
    _min?: MercadoriaMinOrderByAggregateInput
    _sum?: MercadoriaSumOrderByAggregateInput
  }

  export type MercadoriaScalarWhereWithAggregatesInput = {
    AND?: MercadoriaScalarWhereWithAggregatesInput | MercadoriaScalarWhereWithAggregatesInput[]
    OR?: MercadoriaScalarWhereWithAggregatesInput[]
    NOT?: MercadoriaScalarWhereWithAggregatesInput | MercadoriaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mercadoria"> | number
    nome?: StringWithAggregatesFilter<"Mercadoria"> | string
    valorUnitario?: FloatWithAggregatesFilter<"Mercadoria"> | number
    quantidadeEstoque?: IntWithAggregatesFilter<"Mercadoria"> | number
    descricao?: StringNullableWithAggregatesFilter<"Mercadoria"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Mercadoria"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mercadoria"> | Date | string
  }

  export type FotoWhereInput = {
    AND?: FotoWhereInput | FotoWhereInput[]
    OR?: FotoWhereInput[]
    NOT?: FotoWhereInput | FotoWhereInput[]
    id?: IntFilter<"Foto"> | number
    mercadoriaId?: IntFilter<"Foto"> | number
    path?: StringFilter<"Foto"> | string
    mercadoria?: XOR<MercadoriaScalarRelationFilter, MercadoriaWhereInput>
  }

  export type FotoOrderByWithRelationInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
    path?: SortOrder
    mercadoria?: MercadoriaOrderByWithRelationInput
    _relevance?: FotoOrderByRelevanceInput
  }

  export type FotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FotoWhereInput | FotoWhereInput[]
    OR?: FotoWhereInput[]
    NOT?: FotoWhereInput | FotoWhereInput[]
    mercadoriaId?: IntFilter<"Foto"> | number
    path?: StringFilter<"Foto"> | string
    mercadoria?: XOR<MercadoriaScalarRelationFilter, MercadoriaWhereInput>
  }, "id">

  export type FotoOrderByWithAggregationInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
    path?: SortOrder
    _count?: FotoCountOrderByAggregateInput
    _avg?: FotoAvgOrderByAggregateInput
    _max?: FotoMaxOrderByAggregateInput
    _min?: FotoMinOrderByAggregateInput
    _sum?: FotoSumOrderByAggregateInput
  }

  export type FotoScalarWhereWithAggregatesInput = {
    AND?: FotoScalarWhereWithAggregatesInput | FotoScalarWhereWithAggregatesInput[]
    OR?: FotoScalarWhereWithAggregatesInput[]
    NOT?: FotoScalarWhereWithAggregatesInput | FotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Foto"> | number
    mercadoriaId?: IntWithAggregatesFilter<"Foto"> | number
    path?: StringWithAggregatesFilter<"Foto"> | string
  }

  export type VendaWhereInput = {
    AND?: VendaWhereInput | VendaWhereInput[]
    OR?: VendaWhereInput[]
    NOT?: VendaWhereInput | VendaWhereInput[]
    id?: IntFilter<"Venda"> | number
    clienteId?: IntFilter<"Venda"> | number
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    tipoPagamento?: StringFilter<"Venda"> | string
    valorTotal?: FloatFilter<"Venda"> | number
    entrada?: FloatNullableFilter<"Venda"> | number | null
    numParcelas?: IntNullableFilter<"Venda"> | number | null
    parcelasRestantes?: IntNullableFilter<"Venda"> | number | null
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    parcelas?: ParcelaListRelationFilter
  }

  export type VendaOrderByWithRelationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    dataVenda?: SortOrder
    tipoPagamento?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrderInput | SortOrder
    numParcelas?: SortOrderInput | SortOrder
    parcelasRestantes?: SortOrderInput | SortOrder
    cliente?: ClienteOrderByWithRelationInput
    parcelas?: ParcelaOrderByRelationAggregateInput
    _relevance?: VendaOrderByRelevanceInput
  }

  export type VendaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendaWhereInput | VendaWhereInput[]
    OR?: VendaWhereInput[]
    NOT?: VendaWhereInput | VendaWhereInput[]
    clienteId?: IntFilter<"Venda"> | number
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    tipoPagamento?: StringFilter<"Venda"> | string
    valorTotal?: FloatFilter<"Venda"> | number
    entrada?: FloatNullableFilter<"Venda"> | number | null
    numParcelas?: IntNullableFilter<"Venda"> | number | null
    parcelasRestantes?: IntNullableFilter<"Venda"> | number | null
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    parcelas?: ParcelaListRelationFilter
  }, "id">

  export type VendaOrderByWithAggregationInput = {
    id?: SortOrder
    clienteId?: SortOrder
    dataVenda?: SortOrder
    tipoPagamento?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrderInput | SortOrder
    numParcelas?: SortOrderInput | SortOrder
    parcelasRestantes?: SortOrderInput | SortOrder
    _count?: VendaCountOrderByAggregateInput
    _avg?: VendaAvgOrderByAggregateInput
    _max?: VendaMaxOrderByAggregateInput
    _min?: VendaMinOrderByAggregateInput
    _sum?: VendaSumOrderByAggregateInput
  }

  export type VendaScalarWhereWithAggregatesInput = {
    AND?: VendaScalarWhereWithAggregatesInput | VendaScalarWhereWithAggregatesInput[]
    OR?: VendaScalarWhereWithAggregatesInput[]
    NOT?: VendaScalarWhereWithAggregatesInput | VendaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Venda"> | number
    clienteId?: IntWithAggregatesFilter<"Venda"> | number
    dataVenda?: DateTimeWithAggregatesFilter<"Venda"> | Date | string
    tipoPagamento?: StringWithAggregatesFilter<"Venda"> | string
    valorTotal?: FloatWithAggregatesFilter<"Venda"> | number
    entrada?: FloatNullableWithAggregatesFilter<"Venda"> | number | null
    numParcelas?: IntNullableWithAggregatesFilter<"Venda"> | number | null
    parcelasRestantes?: IntNullableWithAggregatesFilter<"Venda"> | number | null
  }

  export type ParcelaWhereInput = {
    AND?: ParcelaWhereInput | ParcelaWhereInput[]
    OR?: ParcelaWhereInput[]
    NOT?: ParcelaWhereInput | ParcelaWhereInput[]
    id?: IntFilter<"Parcela"> | number
    vendaId?: IntFilter<"Parcela"> | number
    numParcela?: IntFilter<"Parcela"> | number
    valorParcela?: FloatFilter<"Parcela"> | number
    dataVencimento?: DateTimeFilter<"Parcela"> | Date | string
    pago?: BoolFilter<"Parcela"> | boolean
    dataPagamento?: DateTimeNullableFilter<"Parcela"> | Date | string | null
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
    comprovante?: XOR<ComprovanteNullableScalarRelationFilter, ComprovanteWhereInput> | null
  }

  export type ParcelaOrderByWithRelationInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
    dataVencimento?: SortOrder
    pago?: SortOrder
    dataPagamento?: SortOrderInput | SortOrder
    venda?: VendaOrderByWithRelationInput
    comprovante?: ComprovanteOrderByWithRelationInput
  }

  export type ParcelaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ParcelaWhereInput | ParcelaWhereInput[]
    OR?: ParcelaWhereInput[]
    NOT?: ParcelaWhereInput | ParcelaWhereInput[]
    vendaId?: IntFilter<"Parcela"> | number
    numParcela?: IntFilter<"Parcela"> | number
    valorParcela?: FloatFilter<"Parcela"> | number
    dataVencimento?: DateTimeFilter<"Parcela"> | Date | string
    pago?: BoolFilter<"Parcela"> | boolean
    dataPagamento?: DateTimeNullableFilter<"Parcela"> | Date | string | null
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
    comprovante?: XOR<ComprovanteNullableScalarRelationFilter, ComprovanteWhereInput> | null
  }, "id">

  export type ParcelaOrderByWithAggregationInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
    dataVencimento?: SortOrder
    pago?: SortOrder
    dataPagamento?: SortOrderInput | SortOrder
    _count?: ParcelaCountOrderByAggregateInput
    _avg?: ParcelaAvgOrderByAggregateInput
    _max?: ParcelaMaxOrderByAggregateInput
    _min?: ParcelaMinOrderByAggregateInput
    _sum?: ParcelaSumOrderByAggregateInput
  }

  export type ParcelaScalarWhereWithAggregatesInput = {
    AND?: ParcelaScalarWhereWithAggregatesInput | ParcelaScalarWhereWithAggregatesInput[]
    OR?: ParcelaScalarWhereWithAggregatesInput[]
    NOT?: ParcelaScalarWhereWithAggregatesInput | ParcelaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Parcela"> | number
    vendaId?: IntWithAggregatesFilter<"Parcela"> | number
    numParcela?: IntWithAggregatesFilter<"Parcela"> | number
    valorParcela?: FloatWithAggregatesFilter<"Parcela"> | number
    dataVencimento?: DateTimeWithAggregatesFilter<"Parcela"> | Date | string
    pago?: BoolWithAggregatesFilter<"Parcela"> | boolean
    dataPagamento?: DateTimeNullableWithAggregatesFilter<"Parcela"> | Date | string | null
  }

  export type ComprovanteWhereInput = {
    AND?: ComprovanteWhereInput | ComprovanteWhereInput[]
    OR?: ComprovanteWhereInput[]
    NOT?: ComprovanteWhereInput | ComprovanteWhereInput[]
    id?: IntFilter<"Comprovante"> | number
    parcelaId?: IntFilter<"Comprovante"> | number
    arquivoPath?: StringFilter<"Comprovante"> | string
    dataUpload?: DateTimeFilter<"Comprovante"> | Date | string
    recebidoPor?: StringFilter<"Comprovante"> | string
    parcela?: XOR<ParcelaScalarRelationFilter, ParcelaWhereInput>
  }

  export type ComprovanteOrderByWithRelationInput = {
    id?: SortOrder
    parcelaId?: SortOrder
    arquivoPath?: SortOrder
    dataUpload?: SortOrder
    recebidoPor?: SortOrder
    parcela?: ParcelaOrderByWithRelationInput
    _relevance?: ComprovanteOrderByRelevanceInput
  }

  export type ComprovanteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    parcelaId?: number
    AND?: ComprovanteWhereInput | ComprovanteWhereInput[]
    OR?: ComprovanteWhereInput[]
    NOT?: ComprovanteWhereInput | ComprovanteWhereInput[]
    arquivoPath?: StringFilter<"Comprovante"> | string
    dataUpload?: DateTimeFilter<"Comprovante"> | Date | string
    recebidoPor?: StringFilter<"Comprovante"> | string
    parcela?: XOR<ParcelaScalarRelationFilter, ParcelaWhereInput>
  }, "id" | "parcelaId">

  export type ComprovanteOrderByWithAggregationInput = {
    id?: SortOrder
    parcelaId?: SortOrder
    arquivoPath?: SortOrder
    dataUpload?: SortOrder
    recebidoPor?: SortOrder
    _count?: ComprovanteCountOrderByAggregateInput
    _avg?: ComprovanteAvgOrderByAggregateInput
    _max?: ComprovanteMaxOrderByAggregateInput
    _min?: ComprovanteMinOrderByAggregateInput
    _sum?: ComprovanteSumOrderByAggregateInput
  }

  export type ComprovanteScalarWhereWithAggregatesInput = {
    AND?: ComprovanteScalarWhereWithAggregatesInput | ComprovanteScalarWhereWithAggregatesInput[]
    OR?: ComprovanteScalarWhereWithAggregatesInput[]
    NOT?: ComprovanteScalarWhereWithAggregatesInput | ComprovanteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comprovante"> | number
    parcelaId?: IntWithAggregatesFilter<"Comprovante"> | number
    arquivoPath?: StringWithAggregatesFilter<"Comprovante"> | string
    dataUpload?: DateTimeWithAggregatesFilter<"Comprovante"> | Date | string
    recebidoPor?: StringWithAggregatesFilter<"Comprovante"> | string
  }

  export type UserCreateInput = {
    nome: string
    email: string
    telefone: string
    endereco?: string | null
    senha: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    nome: string
    email: string
    telefone: string
    endereco?: string | null
    senha: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    nome: string
    email: string
    telefone: string
    endereco?: string | null
    senha: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    senha?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateInput = {
    nome: string
    telefone: string
    cpf: string
    endereco?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vendas?: VendaCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: number
    nome: string
    telefone: string
    cpf: string
    endereco?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vendas?: VendaUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendas?: VendaUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendas?: VendaUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: number
    nome: string
    telefone: string
    cpf: string
    endereco?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MercadoriaCreateInput = {
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fotos?: FotoCreateNestedManyWithoutMercadoriaInput
  }

  export type MercadoriaUncheckedCreateInput = {
    id?: number
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fotos?: FotoUncheckedCreateNestedManyWithoutMercadoriaInput
  }

  export type MercadoriaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fotos?: FotoUpdateManyWithoutMercadoriaNestedInput
  }

  export type MercadoriaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fotos?: FotoUncheckedUpdateManyWithoutMercadoriaNestedInput
  }

  export type MercadoriaCreateManyInput = {
    id?: number
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MercadoriaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MercadoriaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FotoCreateInput = {
    path: string
    mercadoria: MercadoriaCreateNestedOneWithoutFotosInput
  }

  export type FotoUncheckedCreateInput = {
    id?: number
    mercadoriaId: number
    path: string
  }

  export type FotoUpdateInput = {
    path?: StringFieldUpdateOperationsInput | string
    mercadoria?: MercadoriaUpdateOneRequiredWithoutFotosNestedInput
  }

  export type FotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mercadoriaId?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type FotoCreateManyInput = {
    id?: number
    mercadoriaId: number
    path: string
  }

  export type FotoUpdateManyMutationInput = {
    path?: StringFieldUpdateOperationsInput | string
  }

  export type FotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mercadoriaId?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type VendaCreateInput = {
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
    cliente: ClienteCreateNestedOneWithoutVendasInput
    parcelas?: ParcelaCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateInput = {
    id?: number
    clienteId: number
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
    parcelas?: ParcelaUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaUpdateInput = {
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
    cliente?: ClienteUpdateOneRequiredWithoutVendasNestedInput
    parcelas?: ParcelaUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clienteId?: IntFieldUpdateOperationsInput | number
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
    parcelas?: ParcelaUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type VendaCreateManyInput = {
    id?: number
    clienteId: number
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
  }

  export type VendaUpdateManyMutationInput = {
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VendaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clienteId?: IntFieldUpdateOperationsInput | number
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ParcelaCreateInput = {
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
    venda: VendaCreateNestedOneWithoutParcelasInput
    comprovante?: ComprovanteCreateNestedOneWithoutParcelaInput
  }

  export type ParcelaUncheckedCreateInput = {
    id?: number
    vendaId: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
    comprovante?: ComprovanteUncheckedCreateNestedOneWithoutParcelaInput
  }

  export type ParcelaUpdateInput = {
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venda?: VendaUpdateOneRequiredWithoutParcelasNestedInput
    comprovante?: ComprovanteUpdateOneWithoutParcelaNestedInput
  }

  export type ParcelaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendaId?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comprovante?: ComprovanteUncheckedUpdateOneWithoutParcelaNestedInput
  }

  export type ParcelaCreateManyInput = {
    id?: number
    vendaId: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
  }

  export type ParcelaUpdateManyMutationInput = {
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParcelaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendaId?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ComprovanteCreateInput = {
    arquivoPath: string
    dataUpload?: Date | string
    recebidoPor: string
    parcela: ParcelaCreateNestedOneWithoutComprovanteInput
  }

  export type ComprovanteUncheckedCreateInput = {
    id?: number
    parcelaId: number
    arquivoPath: string
    dataUpload?: Date | string
    recebidoPor: string
  }

  export type ComprovanteUpdateInput = {
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
    parcela?: ParcelaUpdateOneRequiredWithoutComprovanteNestedInput
  }

  export type ComprovanteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    parcelaId?: IntFieldUpdateOperationsInput | number
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
  }

  export type ComprovanteCreateManyInput = {
    id?: number
    parcelaId: number
    arquivoPath: string
    dataUpload?: Date | string
    recebidoPor: string
  }

  export type ComprovanteUpdateManyMutationInput = {
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
  }

  export type ComprovanteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    parcelaId?: IntFieldUpdateOperationsInput | number
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    endereco?: SortOrder
    senha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    endereco?: SortOrder
    senha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    telefone?: SortOrder
    endereco?: SortOrder
    senha?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VendaListRelationFilter = {
    every?: VendaWhereInput
    some?: VendaWhereInput
    none?: VendaWhereInput
  }

  export type VendaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteOrderByRelevanceInput = {
    fields: ClienteOrderByRelevanceFieldEnum | ClienteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    cpf?: SortOrder
    endereco?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    cpf?: SortOrder
    endereco?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    telefone?: SortOrder
    cpf?: SortOrder
    endereco?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FotoListRelationFilter = {
    every?: FotoWhereInput
    some?: FotoWhereInput
    none?: FotoWhereInput
  }

  export type FotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MercadoriaOrderByRelevanceInput = {
    fields: MercadoriaOrderByRelevanceFieldEnum | MercadoriaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MercadoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
    descricao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MercadoriaAvgOrderByAggregateInput = {
    id?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
  }

  export type MercadoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
    descricao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MercadoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
    descricao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MercadoriaSumOrderByAggregateInput = {
    id?: SortOrder
    valorUnitario?: SortOrder
    quantidadeEstoque?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type MercadoriaScalarRelationFilter = {
    is?: MercadoriaWhereInput
    isNot?: MercadoriaWhereInput
  }

  export type FotoOrderByRelevanceInput = {
    fields: FotoOrderByRelevanceFieldEnum | FotoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FotoCountOrderByAggregateInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
    path?: SortOrder
  }

  export type FotoAvgOrderByAggregateInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
  }

  export type FotoMaxOrderByAggregateInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
    path?: SortOrder
  }

  export type FotoMinOrderByAggregateInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
    path?: SortOrder
  }

  export type FotoSumOrderByAggregateInput = {
    id?: SortOrder
    mercadoriaId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ClienteScalarRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type ParcelaListRelationFilter = {
    every?: ParcelaWhereInput
    some?: ParcelaWhereInput
    none?: ParcelaWhereInput
  }

  export type ParcelaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendaOrderByRelevanceInput = {
    fields: VendaOrderByRelevanceFieldEnum | VendaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type VendaCountOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    dataVenda?: SortOrder
    tipoPagamento?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrder
    numParcelas?: SortOrder
    parcelasRestantes?: SortOrder
  }

  export type VendaAvgOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrder
    numParcelas?: SortOrder
    parcelasRestantes?: SortOrder
  }

  export type VendaMaxOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    dataVenda?: SortOrder
    tipoPagamento?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrder
    numParcelas?: SortOrder
    parcelasRestantes?: SortOrder
  }

  export type VendaMinOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    dataVenda?: SortOrder
    tipoPagamento?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrder
    numParcelas?: SortOrder
    parcelasRestantes?: SortOrder
  }

  export type VendaSumOrderByAggregateInput = {
    id?: SortOrder
    clienteId?: SortOrder
    valorTotal?: SortOrder
    entrada?: SortOrder
    numParcelas?: SortOrder
    parcelasRestantes?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type VendaScalarRelationFilter = {
    is?: VendaWhereInput
    isNot?: VendaWhereInput
  }

  export type ComprovanteNullableScalarRelationFilter = {
    is?: ComprovanteWhereInput | null
    isNot?: ComprovanteWhereInput | null
  }

  export type ParcelaCountOrderByAggregateInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
    dataVencimento?: SortOrder
    pago?: SortOrder
    dataPagamento?: SortOrder
  }

  export type ParcelaAvgOrderByAggregateInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
  }

  export type ParcelaMaxOrderByAggregateInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
    dataVencimento?: SortOrder
    pago?: SortOrder
    dataPagamento?: SortOrder
  }

  export type ParcelaMinOrderByAggregateInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
    dataVencimento?: SortOrder
    pago?: SortOrder
    dataPagamento?: SortOrder
  }

  export type ParcelaSumOrderByAggregateInput = {
    id?: SortOrder
    vendaId?: SortOrder
    numParcela?: SortOrder
    valorParcela?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ParcelaScalarRelationFilter = {
    is?: ParcelaWhereInput
    isNot?: ParcelaWhereInput
  }

  export type ComprovanteOrderByRelevanceInput = {
    fields: ComprovanteOrderByRelevanceFieldEnum | ComprovanteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ComprovanteCountOrderByAggregateInput = {
    id?: SortOrder
    parcelaId?: SortOrder
    arquivoPath?: SortOrder
    dataUpload?: SortOrder
    recebidoPor?: SortOrder
  }

  export type ComprovanteAvgOrderByAggregateInput = {
    id?: SortOrder
    parcelaId?: SortOrder
  }

  export type ComprovanteMaxOrderByAggregateInput = {
    id?: SortOrder
    parcelaId?: SortOrder
    arquivoPath?: SortOrder
    dataUpload?: SortOrder
    recebidoPor?: SortOrder
  }

  export type ComprovanteMinOrderByAggregateInput = {
    id?: SortOrder
    parcelaId?: SortOrder
    arquivoPath?: SortOrder
    dataUpload?: SortOrder
    recebidoPor?: SortOrder
  }

  export type ComprovanteSumOrderByAggregateInput = {
    id?: SortOrder
    parcelaId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendaCreateNestedManyWithoutClienteInput = {
    create?: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput> | VendaCreateWithoutClienteInput[] | VendaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutClienteInput | VendaCreateOrConnectWithoutClienteInput[]
    createMany?: VendaCreateManyClienteInputEnvelope
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
  }

  export type VendaUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput> | VendaCreateWithoutClienteInput[] | VendaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutClienteInput | VendaCreateOrConnectWithoutClienteInput[]
    createMany?: VendaCreateManyClienteInputEnvelope
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
  }

  export type VendaUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput> | VendaCreateWithoutClienteInput[] | VendaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutClienteInput | VendaCreateOrConnectWithoutClienteInput[]
    upsert?: VendaUpsertWithWhereUniqueWithoutClienteInput | VendaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VendaCreateManyClienteInputEnvelope
    set?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    disconnect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    delete?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    update?: VendaUpdateWithWhereUniqueWithoutClienteInput | VendaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VendaUpdateManyWithWhereWithoutClienteInput | VendaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VendaScalarWhereInput | VendaScalarWhereInput[]
  }

  export type VendaUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput> | VendaCreateWithoutClienteInput[] | VendaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutClienteInput | VendaCreateOrConnectWithoutClienteInput[]
    upsert?: VendaUpsertWithWhereUniqueWithoutClienteInput | VendaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: VendaCreateManyClienteInputEnvelope
    set?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    disconnect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    delete?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    update?: VendaUpdateWithWhereUniqueWithoutClienteInput | VendaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: VendaUpdateManyWithWhereWithoutClienteInput | VendaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: VendaScalarWhereInput | VendaScalarWhereInput[]
  }

  export type FotoCreateNestedManyWithoutMercadoriaInput = {
    create?: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput> | FotoCreateWithoutMercadoriaInput[] | FotoUncheckedCreateWithoutMercadoriaInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutMercadoriaInput | FotoCreateOrConnectWithoutMercadoriaInput[]
    createMany?: FotoCreateManyMercadoriaInputEnvelope
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
  }

  export type FotoUncheckedCreateNestedManyWithoutMercadoriaInput = {
    create?: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput> | FotoCreateWithoutMercadoriaInput[] | FotoUncheckedCreateWithoutMercadoriaInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutMercadoriaInput | FotoCreateOrConnectWithoutMercadoriaInput[]
    createMany?: FotoCreateManyMercadoriaInputEnvelope
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FotoUpdateManyWithoutMercadoriaNestedInput = {
    create?: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput> | FotoCreateWithoutMercadoriaInput[] | FotoUncheckedCreateWithoutMercadoriaInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutMercadoriaInput | FotoCreateOrConnectWithoutMercadoriaInput[]
    upsert?: FotoUpsertWithWhereUniqueWithoutMercadoriaInput | FotoUpsertWithWhereUniqueWithoutMercadoriaInput[]
    createMany?: FotoCreateManyMercadoriaInputEnvelope
    set?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    disconnect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    delete?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    update?: FotoUpdateWithWhereUniqueWithoutMercadoriaInput | FotoUpdateWithWhereUniqueWithoutMercadoriaInput[]
    updateMany?: FotoUpdateManyWithWhereWithoutMercadoriaInput | FotoUpdateManyWithWhereWithoutMercadoriaInput[]
    deleteMany?: FotoScalarWhereInput | FotoScalarWhereInput[]
  }

  export type FotoUncheckedUpdateManyWithoutMercadoriaNestedInput = {
    create?: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput> | FotoCreateWithoutMercadoriaInput[] | FotoUncheckedCreateWithoutMercadoriaInput[]
    connectOrCreate?: FotoCreateOrConnectWithoutMercadoriaInput | FotoCreateOrConnectWithoutMercadoriaInput[]
    upsert?: FotoUpsertWithWhereUniqueWithoutMercadoriaInput | FotoUpsertWithWhereUniqueWithoutMercadoriaInput[]
    createMany?: FotoCreateManyMercadoriaInputEnvelope
    set?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    disconnect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    delete?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    connect?: FotoWhereUniqueInput | FotoWhereUniqueInput[]
    update?: FotoUpdateWithWhereUniqueWithoutMercadoriaInput | FotoUpdateWithWhereUniqueWithoutMercadoriaInput[]
    updateMany?: FotoUpdateManyWithWhereWithoutMercadoriaInput | FotoUpdateManyWithWhereWithoutMercadoriaInput[]
    deleteMany?: FotoScalarWhereInput | FotoScalarWhereInput[]
  }

  export type MercadoriaCreateNestedOneWithoutFotosInput = {
    create?: XOR<MercadoriaCreateWithoutFotosInput, MercadoriaUncheckedCreateWithoutFotosInput>
    connectOrCreate?: MercadoriaCreateOrConnectWithoutFotosInput
    connect?: MercadoriaWhereUniqueInput
  }

  export type MercadoriaUpdateOneRequiredWithoutFotosNestedInput = {
    create?: XOR<MercadoriaCreateWithoutFotosInput, MercadoriaUncheckedCreateWithoutFotosInput>
    connectOrCreate?: MercadoriaCreateOrConnectWithoutFotosInput
    upsert?: MercadoriaUpsertWithoutFotosInput
    connect?: MercadoriaWhereUniqueInput
    update?: XOR<XOR<MercadoriaUpdateToOneWithWhereWithoutFotosInput, MercadoriaUpdateWithoutFotosInput>, MercadoriaUncheckedUpdateWithoutFotosInput>
  }

  export type ClienteCreateNestedOneWithoutVendasInput = {
    create?: XOR<ClienteCreateWithoutVendasInput, ClienteUncheckedCreateWithoutVendasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVendasInput
    connect?: ClienteWhereUniqueInput
  }

  export type ParcelaCreateNestedManyWithoutVendaInput = {
    create?: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput> | ParcelaCreateWithoutVendaInput[] | ParcelaUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: ParcelaCreateOrConnectWithoutVendaInput | ParcelaCreateOrConnectWithoutVendaInput[]
    createMany?: ParcelaCreateManyVendaInputEnvelope
    connect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
  }

  export type ParcelaUncheckedCreateNestedManyWithoutVendaInput = {
    create?: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput> | ParcelaCreateWithoutVendaInput[] | ParcelaUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: ParcelaCreateOrConnectWithoutVendaInput | ParcelaCreateOrConnectWithoutVendaInput[]
    createMany?: ParcelaCreateManyVendaInputEnvelope
    connect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClienteUpdateOneRequiredWithoutVendasNestedInput = {
    create?: XOR<ClienteCreateWithoutVendasInput, ClienteUncheckedCreateWithoutVendasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutVendasInput
    upsert?: ClienteUpsertWithoutVendasInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutVendasInput, ClienteUpdateWithoutVendasInput>, ClienteUncheckedUpdateWithoutVendasInput>
  }

  export type ParcelaUpdateManyWithoutVendaNestedInput = {
    create?: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput> | ParcelaCreateWithoutVendaInput[] | ParcelaUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: ParcelaCreateOrConnectWithoutVendaInput | ParcelaCreateOrConnectWithoutVendaInput[]
    upsert?: ParcelaUpsertWithWhereUniqueWithoutVendaInput | ParcelaUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: ParcelaCreateManyVendaInputEnvelope
    set?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    disconnect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    delete?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    connect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    update?: ParcelaUpdateWithWhereUniqueWithoutVendaInput | ParcelaUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: ParcelaUpdateManyWithWhereWithoutVendaInput | ParcelaUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: ParcelaScalarWhereInput | ParcelaScalarWhereInput[]
  }

  export type ParcelaUncheckedUpdateManyWithoutVendaNestedInput = {
    create?: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput> | ParcelaCreateWithoutVendaInput[] | ParcelaUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: ParcelaCreateOrConnectWithoutVendaInput | ParcelaCreateOrConnectWithoutVendaInput[]
    upsert?: ParcelaUpsertWithWhereUniqueWithoutVendaInput | ParcelaUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: ParcelaCreateManyVendaInputEnvelope
    set?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    disconnect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    delete?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    connect?: ParcelaWhereUniqueInput | ParcelaWhereUniqueInput[]
    update?: ParcelaUpdateWithWhereUniqueWithoutVendaInput | ParcelaUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: ParcelaUpdateManyWithWhereWithoutVendaInput | ParcelaUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: ParcelaScalarWhereInput | ParcelaScalarWhereInput[]
  }

  export type VendaCreateNestedOneWithoutParcelasInput = {
    create?: XOR<VendaCreateWithoutParcelasInput, VendaUncheckedCreateWithoutParcelasInput>
    connectOrCreate?: VendaCreateOrConnectWithoutParcelasInput
    connect?: VendaWhereUniqueInput
  }

  export type ComprovanteCreateNestedOneWithoutParcelaInput = {
    create?: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
    connectOrCreate?: ComprovanteCreateOrConnectWithoutParcelaInput
    connect?: ComprovanteWhereUniqueInput
  }

  export type ComprovanteUncheckedCreateNestedOneWithoutParcelaInput = {
    create?: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
    connectOrCreate?: ComprovanteCreateOrConnectWithoutParcelaInput
    connect?: ComprovanteWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type VendaUpdateOneRequiredWithoutParcelasNestedInput = {
    create?: XOR<VendaCreateWithoutParcelasInput, VendaUncheckedCreateWithoutParcelasInput>
    connectOrCreate?: VendaCreateOrConnectWithoutParcelasInput
    upsert?: VendaUpsertWithoutParcelasInput
    connect?: VendaWhereUniqueInput
    update?: XOR<XOR<VendaUpdateToOneWithWhereWithoutParcelasInput, VendaUpdateWithoutParcelasInput>, VendaUncheckedUpdateWithoutParcelasInput>
  }

  export type ComprovanteUpdateOneWithoutParcelaNestedInput = {
    create?: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
    connectOrCreate?: ComprovanteCreateOrConnectWithoutParcelaInput
    upsert?: ComprovanteUpsertWithoutParcelaInput
    disconnect?: ComprovanteWhereInput | boolean
    delete?: ComprovanteWhereInput | boolean
    connect?: ComprovanteWhereUniqueInput
    update?: XOR<XOR<ComprovanteUpdateToOneWithWhereWithoutParcelaInput, ComprovanteUpdateWithoutParcelaInput>, ComprovanteUncheckedUpdateWithoutParcelaInput>
  }

  export type ComprovanteUncheckedUpdateOneWithoutParcelaNestedInput = {
    create?: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
    connectOrCreate?: ComprovanteCreateOrConnectWithoutParcelaInput
    upsert?: ComprovanteUpsertWithoutParcelaInput
    disconnect?: ComprovanteWhereInput | boolean
    delete?: ComprovanteWhereInput | boolean
    connect?: ComprovanteWhereUniqueInput
    update?: XOR<XOR<ComprovanteUpdateToOneWithWhereWithoutParcelaInput, ComprovanteUpdateWithoutParcelaInput>, ComprovanteUncheckedUpdateWithoutParcelaInput>
  }

  export type ParcelaCreateNestedOneWithoutComprovanteInput = {
    create?: XOR<ParcelaCreateWithoutComprovanteInput, ParcelaUncheckedCreateWithoutComprovanteInput>
    connectOrCreate?: ParcelaCreateOrConnectWithoutComprovanteInput
    connect?: ParcelaWhereUniqueInput
  }

  export type ParcelaUpdateOneRequiredWithoutComprovanteNestedInput = {
    create?: XOR<ParcelaCreateWithoutComprovanteInput, ParcelaUncheckedCreateWithoutComprovanteInput>
    connectOrCreate?: ParcelaCreateOrConnectWithoutComprovanteInput
    upsert?: ParcelaUpsertWithoutComprovanteInput
    connect?: ParcelaWhereUniqueInput
    update?: XOR<XOR<ParcelaUpdateToOneWithWhereWithoutComprovanteInput, ParcelaUpdateWithoutComprovanteInput>, ParcelaUncheckedUpdateWithoutComprovanteInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VendaCreateWithoutClienteInput = {
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
    parcelas?: ParcelaCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateWithoutClienteInput = {
    id?: number
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
    parcelas?: ParcelaUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaCreateOrConnectWithoutClienteInput = {
    where: VendaWhereUniqueInput
    create: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput>
  }

  export type VendaCreateManyClienteInputEnvelope = {
    data: VendaCreateManyClienteInput | VendaCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type VendaUpsertWithWhereUniqueWithoutClienteInput = {
    where: VendaWhereUniqueInput
    update: XOR<VendaUpdateWithoutClienteInput, VendaUncheckedUpdateWithoutClienteInput>
    create: XOR<VendaCreateWithoutClienteInput, VendaUncheckedCreateWithoutClienteInput>
  }

  export type VendaUpdateWithWhereUniqueWithoutClienteInput = {
    where: VendaWhereUniqueInput
    data: XOR<VendaUpdateWithoutClienteInput, VendaUncheckedUpdateWithoutClienteInput>
  }

  export type VendaUpdateManyWithWhereWithoutClienteInput = {
    where: VendaScalarWhereInput
    data: XOR<VendaUpdateManyMutationInput, VendaUncheckedUpdateManyWithoutClienteInput>
  }

  export type VendaScalarWhereInput = {
    AND?: VendaScalarWhereInput | VendaScalarWhereInput[]
    OR?: VendaScalarWhereInput[]
    NOT?: VendaScalarWhereInput | VendaScalarWhereInput[]
    id?: IntFilter<"Venda"> | number
    clienteId?: IntFilter<"Venda"> | number
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    tipoPagamento?: StringFilter<"Venda"> | string
    valorTotal?: FloatFilter<"Venda"> | number
    entrada?: FloatNullableFilter<"Venda"> | number | null
    numParcelas?: IntNullableFilter<"Venda"> | number | null
    parcelasRestantes?: IntNullableFilter<"Venda"> | number | null
  }

  export type FotoCreateWithoutMercadoriaInput = {
    path: string
  }

  export type FotoUncheckedCreateWithoutMercadoriaInput = {
    id?: number
    path: string
  }

  export type FotoCreateOrConnectWithoutMercadoriaInput = {
    where: FotoWhereUniqueInput
    create: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput>
  }

  export type FotoCreateManyMercadoriaInputEnvelope = {
    data: FotoCreateManyMercadoriaInput | FotoCreateManyMercadoriaInput[]
    skipDuplicates?: boolean
  }

  export type FotoUpsertWithWhereUniqueWithoutMercadoriaInput = {
    where: FotoWhereUniqueInput
    update: XOR<FotoUpdateWithoutMercadoriaInput, FotoUncheckedUpdateWithoutMercadoriaInput>
    create: XOR<FotoCreateWithoutMercadoriaInput, FotoUncheckedCreateWithoutMercadoriaInput>
  }

  export type FotoUpdateWithWhereUniqueWithoutMercadoriaInput = {
    where: FotoWhereUniqueInput
    data: XOR<FotoUpdateWithoutMercadoriaInput, FotoUncheckedUpdateWithoutMercadoriaInput>
  }

  export type FotoUpdateManyWithWhereWithoutMercadoriaInput = {
    where: FotoScalarWhereInput
    data: XOR<FotoUpdateManyMutationInput, FotoUncheckedUpdateManyWithoutMercadoriaInput>
  }

  export type FotoScalarWhereInput = {
    AND?: FotoScalarWhereInput | FotoScalarWhereInput[]
    OR?: FotoScalarWhereInput[]
    NOT?: FotoScalarWhereInput | FotoScalarWhereInput[]
    id?: IntFilter<"Foto"> | number
    mercadoriaId?: IntFilter<"Foto"> | number
    path?: StringFilter<"Foto"> | string
  }

  export type MercadoriaCreateWithoutFotosInput = {
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MercadoriaUncheckedCreateWithoutFotosInput = {
    id?: number
    nome: string
    valorUnitario: number
    quantidadeEstoque: number
    descricao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MercadoriaCreateOrConnectWithoutFotosInput = {
    where: MercadoriaWhereUniqueInput
    create: XOR<MercadoriaCreateWithoutFotosInput, MercadoriaUncheckedCreateWithoutFotosInput>
  }

  export type MercadoriaUpsertWithoutFotosInput = {
    update: XOR<MercadoriaUpdateWithoutFotosInput, MercadoriaUncheckedUpdateWithoutFotosInput>
    create: XOR<MercadoriaCreateWithoutFotosInput, MercadoriaUncheckedCreateWithoutFotosInput>
    where?: MercadoriaWhereInput
  }

  export type MercadoriaUpdateToOneWithWhereWithoutFotosInput = {
    where?: MercadoriaWhereInput
    data: XOR<MercadoriaUpdateWithoutFotosInput, MercadoriaUncheckedUpdateWithoutFotosInput>
  }

  export type MercadoriaUpdateWithoutFotosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MercadoriaUncheckedUpdateWithoutFotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    quantidadeEstoque?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateWithoutVendasInput = {
    nome: string
    telefone: string
    cpf: string
    endereco?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUncheckedCreateWithoutVendasInput = {
    id?: number
    nome: string
    telefone: string
    cpf: string
    endereco?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteCreateOrConnectWithoutVendasInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutVendasInput, ClienteUncheckedCreateWithoutVendasInput>
  }

  export type ParcelaCreateWithoutVendaInput = {
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
    comprovante?: ComprovanteCreateNestedOneWithoutParcelaInput
  }

  export type ParcelaUncheckedCreateWithoutVendaInput = {
    id?: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
    comprovante?: ComprovanteUncheckedCreateNestedOneWithoutParcelaInput
  }

  export type ParcelaCreateOrConnectWithoutVendaInput = {
    where: ParcelaWhereUniqueInput
    create: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput>
  }

  export type ParcelaCreateManyVendaInputEnvelope = {
    data: ParcelaCreateManyVendaInput | ParcelaCreateManyVendaInput[]
    skipDuplicates?: boolean
  }

  export type ClienteUpsertWithoutVendasInput = {
    update: XOR<ClienteUpdateWithoutVendasInput, ClienteUncheckedUpdateWithoutVendasInput>
    create: XOR<ClienteCreateWithoutVendasInput, ClienteUncheckedCreateWithoutVendasInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutVendasInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutVendasInput, ClienteUncheckedUpdateWithoutVendasInput>
  }

  export type ClienteUpdateWithoutVendasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateWithoutVendasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    cpf?: StringFieldUpdateOperationsInput | string
    endereco?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParcelaUpsertWithWhereUniqueWithoutVendaInput = {
    where: ParcelaWhereUniqueInput
    update: XOR<ParcelaUpdateWithoutVendaInput, ParcelaUncheckedUpdateWithoutVendaInput>
    create: XOR<ParcelaCreateWithoutVendaInput, ParcelaUncheckedCreateWithoutVendaInput>
  }

  export type ParcelaUpdateWithWhereUniqueWithoutVendaInput = {
    where: ParcelaWhereUniqueInput
    data: XOR<ParcelaUpdateWithoutVendaInput, ParcelaUncheckedUpdateWithoutVendaInput>
  }

  export type ParcelaUpdateManyWithWhereWithoutVendaInput = {
    where: ParcelaScalarWhereInput
    data: XOR<ParcelaUpdateManyMutationInput, ParcelaUncheckedUpdateManyWithoutVendaInput>
  }

  export type ParcelaScalarWhereInput = {
    AND?: ParcelaScalarWhereInput | ParcelaScalarWhereInput[]
    OR?: ParcelaScalarWhereInput[]
    NOT?: ParcelaScalarWhereInput | ParcelaScalarWhereInput[]
    id?: IntFilter<"Parcela"> | number
    vendaId?: IntFilter<"Parcela"> | number
    numParcela?: IntFilter<"Parcela"> | number
    valorParcela?: FloatFilter<"Parcela"> | number
    dataVencimento?: DateTimeFilter<"Parcela"> | Date | string
    pago?: BoolFilter<"Parcela"> | boolean
    dataPagamento?: DateTimeNullableFilter<"Parcela"> | Date | string | null
  }

  export type VendaCreateWithoutParcelasInput = {
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
    cliente: ClienteCreateNestedOneWithoutVendasInput
  }

  export type VendaUncheckedCreateWithoutParcelasInput = {
    id?: number
    clienteId: number
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
  }

  export type VendaCreateOrConnectWithoutParcelasInput = {
    where: VendaWhereUniqueInput
    create: XOR<VendaCreateWithoutParcelasInput, VendaUncheckedCreateWithoutParcelasInput>
  }

  export type ComprovanteCreateWithoutParcelaInput = {
    arquivoPath: string
    dataUpload?: Date | string
    recebidoPor: string
  }

  export type ComprovanteUncheckedCreateWithoutParcelaInput = {
    id?: number
    arquivoPath: string
    dataUpload?: Date | string
    recebidoPor: string
  }

  export type ComprovanteCreateOrConnectWithoutParcelaInput = {
    where: ComprovanteWhereUniqueInput
    create: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
  }

  export type VendaUpsertWithoutParcelasInput = {
    update: XOR<VendaUpdateWithoutParcelasInput, VendaUncheckedUpdateWithoutParcelasInput>
    create: XOR<VendaCreateWithoutParcelasInput, VendaUncheckedCreateWithoutParcelasInput>
    where?: VendaWhereInput
  }

  export type VendaUpdateToOneWithWhereWithoutParcelasInput = {
    where?: VendaWhereInput
    data: XOR<VendaUpdateWithoutParcelasInput, VendaUncheckedUpdateWithoutParcelasInput>
  }

  export type VendaUpdateWithoutParcelasInput = {
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
    cliente?: ClienteUpdateOneRequiredWithoutVendasNestedInput
  }

  export type VendaUncheckedUpdateWithoutParcelasInput = {
    id?: IntFieldUpdateOperationsInput | number
    clienteId?: IntFieldUpdateOperationsInput | number
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ComprovanteUpsertWithoutParcelaInput = {
    update: XOR<ComprovanteUpdateWithoutParcelaInput, ComprovanteUncheckedUpdateWithoutParcelaInput>
    create: XOR<ComprovanteCreateWithoutParcelaInput, ComprovanteUncheckedCreateWithoutParcelaInput>
    where?: ComprovanteWhereInput
  }

  export type ComprovanteUpdateToOneWithWhereWithoutParcelaInput = {
    where?: ComprovanteWhereInput
    data: XOR<ComprovanteUpdateWithoutParcelaInput, ComprovanteUncheckedUpdateWithoutParcelaInput>
  }

  export type ComprovanteUpdateWithoutParcelaInput = {
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
  }

  export type ComprovanteUncheckedUpdateWithoutParcelaInput = {
    id?: IntFieldUpdateOperationsInput | number
    arquivoPath?: StringFieldUpdateOperationsInput | string
    dataUpload?: DateTimeFieldUpdateOperationsInput | Date | string
    recebidoPor?: StringFieldUpdateOperationsInput | string
  }

  export type ParcelaCreateWithoutComprovanteInput = {
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
    venda: VendaCreateNestedOneWithoutParcelasInput
  }

  export type ParcelaUncheckedCreateWithoutComprovanteInput = {
    id?: number
    vendaId: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
  }

  export type ParcelaCreateOrConnectWithoutComprovanteInput = {
    where: ParcelaWhereUniqueInput
    create: XOR<ParcelaCreateWithoutComprovanteInput, ParcelaUncheckedCreateWithoutComprovanteInput>
  }

  export type ParcelaUpsertWithoutComprovanteInput = {
    update: XOR<ParcelaUpdateWithoutComprovanteInput, ParcelaUncheckedUpdateWithoutComprovanteInput>
    create: XOR<ParcelaCreateWithoutComprovanteInput, ParcelaUncheckedCreateWithoutComprovanteInput>
    where?: ParcelaWhereInput
  }

  export type ParcelaUpdateToOneWithWhereWithoutComprovanteInput = {
    where?: ParcelaWhereInput
    data: XOR<ParcelaUpdateWithoutComprovanteInput, ParcelaUncheckedUpdateWithoutComprovanteInput>
  }

  export type ParcelaUpdateWithoutComprovanteInput = {
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venda?: VendaUpdateOneRequiredWithoutParcelasNestedInput
  }

  export type ParcelaUncheckedUpdateWithoutComprovanteInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendaId?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VendaCreateManyClienteInput = {
    id?: number
    dataVenda?: Date | string
    tipoPagamento: string
    valorTotal: number
    entrada?: number | null
    numParcelas?: number | null
    parcelasRestantes?: number | null
  }

  export type VendaUpdateWithoutClienteInput = {
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
    parcelas?: ParcelaUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
    parcelas?: ParcelaUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateManyWithoutClienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    tipoPagamento?: StringFieldUpdateOperationsInput | string
    valorTotal?: FloatFieldUpdateOperationsInput | number
    entrada?: NullableFloatFieldUpdateOperationsInput | number | null
    numParcelas?: NullableIntFieldUpdateOperationsInput | number | null
    parcelasRestantes?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FotoCreateManyMercadoriaInput = {
    id?: number
    path: string
  }

  export type FotoUpdateWithoutMercadoriaInput = {
    path?: StringFieldUpdateOperationsInput | string
  }

  export type FotoUncheckedUpdateWithoutMercadoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type FotoUncheckedUpdateManyWithoutMercadoriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type ParcelaCreateManyVendaInput = {
    id?: number
    numParcela: number
    valorParcela: number
    dataVencimento: Date | string
    pago?: boolean
    dataPagamento?: Date | string | null
  }

  export type ParcelaUpdateWithoutVendaInput = {
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comprovante?: ComprovanteUpdateOneWithoutParcelaNestedInput
  }

  export type ParcelaUncheckedUpdateWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    comprovante?: ComprovanteUncheckedUpdateOneWithoutParcelaNestedInput
  }

  export type ParcelaUncheckedUpdateManyWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    numParcela?: IntFieldUpdateOperationsInput | number
    valorParcela?: FloatFieldUpdateOperationsInput | number
    dataVencimento?: DateTimeFieldUpdateOperationsInput | Date | string
    pago?: BoolFieldUpdateOperationsInput | boolean
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}