
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
 * Model Layout
 * 
 */
export type Layout = $Result.DefaultSelection<Prisma.$LayoutPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Layouts
 * const layouts = await prisma.layout.findMany()
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
   * // Fetch zero or more Layouts
   * const layouts = await prisma.layout.findMany()
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
   * `prisma.layout`: Exposes CRUD operations for the **Layout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Layouts
    * const layouts = await prisma.layout.findMany()
    * ```
    */
  get layout(): Prisma.LayoutDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
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
    Layout: 'Layout'
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
      modelProps: "layout"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Layout: {
        payload: Prisma.$LayoutPayload<ExtArgs>
        fields: Prisma.LayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          findFirst: {
            args: Prisma.LayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          findMany: {
            args: Prisma.LayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          create: {
            args: Prisma.LayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          createMany: {
            args: Prisma.LayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          delete: {
            args: Prisma.LayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          update: {
            args: Prisma.LayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          deleteMany: {
            args: Prisma.LayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LayoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          upsert: {
            args: Prisma.LayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          aggregate: {
            args: Prisma.LayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLayout>
          }
          groupBy: {
            args: Prisma.LayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<LayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.LayoutCountArgs<ExtArgs>
            result: $Utils.Optional<LayoutCountAggregateOutputType> | number
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
    layout?: LayoutOmit
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
   * Models
   */

  /**
   * Model Layout
   */

  export type AggregateLayout = {
    _count: LayoutCountAggregateOutputType | null
    _min: LayoutMinAggregateOutputType | null
    _max: LayoutMaxAggregateOutputType | null
  }

  export type LayoutMinAggregateOutputType = {
    id: string | null
    name: string | null
    titleField: string | null
    categoryField: string | null
    typeField: string | null
    amountField: string | null
    dateField: string | null
  }

  export type LayoutMaxAggregateOutputType = {
    id: string | null
    name: string | null
    titleField: string | null
    categoryField: string | null
    typeField: string | null
    amountField: string | null
    dateField: string | null
  }

  export type LayoutCountAggregateOutputType = {
    id: number
    name: number
    titleField: number
    categoryField: number
    typeField: number
    amountField: number
    dateField: number
    _all: number
  }


  export type LayoutMinAggregateInputType = {
    id?: true
    name?: true
    titleField?: true
    categoryField?: true
    typeField?: true
    amountField?: true
    dateField?: true
  }

  export type LayoutMaxAggregateInputType = {
    id?: true
    name?: true
    titleField?: true
    categoryField?: true
    typeField?: true
    amountField?: true
    dateField?: true
  }

  export type LayoutCountAggregateInputType = {
    id?: true
    name?: true
    titleField?: true
    categoryField?: true
    typeField?: true
    amountField?: true
    dateField?: true
    _all?: true
  }

  export type LayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Layout to aggregate.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Layouts
    **/
    _count?: true | LayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LayoutMaxAggregateInputType
  }

  export type GetLayoutAggregateType<T extends LayoutAggregateArgs> = {
        [P in keyof T & keyof AggregateLayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLayout[P]>
      : GetScalarType<T[P], AggregateLayout[P]>
  }




  export type LayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutWhereInput
    orderBy?: LayoutOrderByWithAggregationInput | LayoutOrderByWithAggregationInput[]
    by: LayoutScalarFieldEnum[] | LayoutScalarFieldEnum
    having?: LayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LayoutCountAggregateInputType | true
    _min?: LayoutMinAggregateInputType
    _max?: LayoutMaxAggregateInputType
  }

  export type LayoutGroupByOutputType = {
    id: string
    name: string
    titleField: string
    categoryField: string
    typeField: string
    amountField: string
    dateField: string
    _count: LayoutCountAggregateOutputType | null
    _min: LayoutMinAggregateOutputType | null
    _max: LayoutMaxAggregateOutputType | null
  }

  type GetLayoutGroupByPayload<T extends LayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LayoutGroupByOutputType[P]>
            : GetScalarType<T[P], LayoutGroupByOutputType[P]>
        }
      >
    >


  export type LayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    titleField?: boolean
    categoryField?: boolean
    typeField?: boolean
    amountField?: boolean
    dateField?: boolean
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    titleField?: boolean
    categoryField?: boolean
    typeField?: boolean
    amountField?: boolean
    dateField?: boolean
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    titleField?: boolean
    categoryField?: boolean
    typeField?: boolean
    amountField?: boolean
    dateField?: boolean
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectScalar = {
    id?: boolean
    name?: boolean
    titleField?: boolean
    categoryField?: boolean
    typeField?: boolean
    amountField?: boolean
    dateField?: boolean
  }

  export type LayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "titleField" | "categoryField" | "typeField" | "amountField" | "dateField", ExtArgs["result"]["layout"]>

  export type $LayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Layout"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      titleField: string
      categoryField: string
      typeField: string
      amountField: string
      dateField: string
    }, ExtArgs["result"]["layout"]>
    composites: {}
  }

  type LayoutGetPayload<S extends boolean | null | undefined | LayoutDefaultArgs> = $Result.GetResult<Prisma.$LayoutPayload, S>

  type LayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LayoutCountAggregateInputType | true
    }

  export interface LayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Layout'], meta: { name: 'Layout' } }
    /**
     * Find zero or one Layout that matches the filter.
     * @param {LayoutFindUniqueArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LayoutFindUniqueArgs>(args: SelectSubset<T, LayoutFindUniqueArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Layout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LayoutFindUniqueOrThrowArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, LayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Layout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindFirstArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LayoutFindFirstArgs>(args?: SelectSubset<T, LayoutFindFirstArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Layout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindFirstOrThrowArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, LayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Layouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Layouts
     * const layouts = await prisma.layout.findMany()
     * 
     * // Get first 10 Layouts
     * const layouts = await prisma.layout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const layoutWithIdOnly = await prisma.layout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LayoutFindManyArgs>(args?: SelectSubset<T, LayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Layout.
     * @param {LayoutCreateArgs} args - Arguments to create a Layout.
     * @example
     * // Create one Layout
     * const Layout = await prisma.layout.create({
     *   data: {
     *     // ... data to create a Layout
     *   }
     * })
     * 
     */
    create<T extends LayoutCreateArgs>(args: SelectSubset<T, LayoutCreateArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Layouts.
     * @param {LayoutCreateManyArgs} args - Arguments to create many Layouts.
     * @example
     * // Create many Layouts
     * const layout = await prisma.layout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LayoutCreateManyArgs>(args?: SelectSubset<T, LayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Layouts and returns the data saved in the database.
     * @param {LayoutCreateManyAndReturnArgs} args - Arguments to create many Layouts.
     * @example
     * // Create many Layouts
     * const layout = await prisma.layout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Layouts and only return the `id`
     * const layoutWithIdOnly = await prisma.layout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, LayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Layout.
     * @param {LayoutDeleteArgs} args - Arguments to delete one Layout.
     * @example
     * // Delete one Layout
     * const Layout = await prisma.layout.delete({
     *   where: {
     *     // ... filter to delete one Layout
     *   }
     * })
     * 
     */
    delete<T extends LayoutDeleteArgs>(args: SelectSubset<T, LayoutDeleteArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Layout.
     * @param {LayoutUpdateArgs} args - Arguments to update one Layout.
     * @example
     * // Update one Layout
     * const layout = await prisma.layout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LayoutUpdateArgs>(args: SelectSubset<T, LayoutUpdateArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Layouts.
     * @param {LayoutDeleteManyArgs} args - Arguments to filter Layouts to delete.
     * @example
     * // Delete a few Layouts
     * const { count } = await prisma.layout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LayoutDeleteManyArgs>(args?: SelectSubset<T, LayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Layouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Layouts
     * const layout = await prisma.layout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LayoutUpdateManyArgs>(args: SelectSubset<T, LayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Layouts and returns the data updated in the database.
     * @param {LayoutUpdateManyAndReturnArgs} args - Arguments to update many Layouts.
     * @example
     * // Update many Layouts
     * const layout = await prisma.layout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Layouts and only return the `id`
     * const layoutWithIdOnly = await prisma.layout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LayoutUpdateManyAndReturnArgs>(args: SelectSubset<T, LayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Layout.
     * @param {LayoutUpsertArgs} args - Arguments to update or create a Layout.
     * @example
     * // Update or create a Layout
     * const layout = await prisma.layout.upsert({
     *   create: {
     *     // ... data to create a Layout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Layout we want to update
     *   }
     * })
     */
    upsert<T extends LayoutUpsertArgs>(args: SelectSubset<T, LayoutUpsertArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Layouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutCountArgs} args - Arguments to filter Layouts to count.
     * @example
     * // Count the number of Layouts
     * const count = await prisma.layout.count({
     *   where: {
     *     // ... the filter for the Layouts we want to count
     *   }
     * })
    **/
    count<T extends LayoutCountArgs>(
      args?: Subset<T, LayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Layout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LayoutAggregateArgs>(args: Subset<T, LayoutAggregateArgs>): Prisma.PrismaPromise<GetLayoutAggregateType<T>>

    /**
     * Group by Layout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutGroupByArgs} args - Group by arguments.
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
      T extends LayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LayoutGroupByArgs['orderBy'] }
        : { orderBy?: LayoutGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Layout model
   */
  readonly fields: LayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Layout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Layout model
   */
  interface LayoutFieldRefs {
    readonly id: FieldRef<"Layout", 'String'>
    readonly name: FieldRef<"Layout", 'String'>
    readonly titleField: FieldRef<"Layout", 'String'>
    readonly categoryField: FieldRef<"Layout", 'String'>
    readonly typeField: FieldRef<"Layout", 'String'>
    readonly amountField: FieldRef<"Layout", 'String'>
    readonly dateField: FieldRef<"Layout", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Layout findUnique
   */
  export type LayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout findUniqueOrThrow
   */
  export type LayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout findFirst
   */
  export type LayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Layouts.
     */
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout findFirstOrThrow
   */
  export type LayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Layouts.
     */
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout findMany
   */
  export type LayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter, which Layouts to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout create
   */
  export type LayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data needed to create a Layout.
     */
    data: XOR<LayoutCreateInput, LayoutUncheckedCreateInput>
  }

  /**
   * Layout createMany
   */
  export type LayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Layouts.
     */
    data: LayoutCreateManyInput | LayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Layout createManyAndReturn
   */
  export type LayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data used to create many Layouts.
     */
    data: LayoutCreateManyInput | LayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Layout update
   */
  export type LayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data needed to update a Layout.
     */
    data: XOR<LayoutUpdateInput, LayoutUncheckedUpdateInput>
    /**
     * Choose, which Layout to update.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout updateMany
   */
  export type LayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Layouts.
     */
    data: XOR<LayoutUpdateManyMutationInput, LayoutUncheckedUpdateManyInput>
    /**
     * Filter which Layouts to update
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to update.
     */
    limit?: number
  }

  /**
   * Layout updateManyAndReturn
   */
  export type LayoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data used to update Layouts.
     */
    data: XOR<LayoutUpdateManyMutationInput, LayoutUncheckedUpdateManyInput>
    /**
     * Filter which Layouts to update
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to update.
     */
    limit?: number
  }

  /**
   * Layout upsert
   */
  export type LayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The filter to search for the Layout to update in case it exists.
     */
    where: LayoutWhereUniqueInput
    /**
     * In case the Layout found by the `where` argument doesn't exist, create a new Layout with this data.
     */
    create: XOR<LayoutCreateInput, LayoutUncheckedCreateInput>
    /**
     * In case the Layout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LayoutUpdateInput, LayoutUncheckedUpdateInput>
  }

  /**
   * Layout delete
   */
  export type LayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Filter which Layout to delete.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout deleteMany
   */
  export type LayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Layouts to delete
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to delete.
     */
    limit?: number
  }

  /**
   * Layout without action
   */
  export type LayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
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


  export const LayoutScalarFieldEnum: {
    id: 'id',
    name: 'name',
    titleField: 'titleField',
    categoryField: 'categoryField',
    typeField: 'typeField',
    amountField: 'amountField',
    dateField: 'dateField'
  };

  export type LayoutScalarFieldEnum = (typeof LayoutScalarFieldEnum)[keyof typeof LayoutScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type LayoutWhereInput = {
    AND?: LayoutWhereInput | LayoutWhereInput[]
    OR?: LayoutWhereInput[]
    NOT?: LayoutWhereInput | LayoutWhereInput[]
    id?: UuidFilter<"Layout"> | string
    name?: StringFilter<"Layout"> | string
    titleField?: StringFilter<"Layout"> | string
    categoryField?: StringFilter<"Layout"> | string
    typeField?: StringFilter<"Layout"> | string
    amountField?: StringFilter<"Layout"> | string
    dateField?: StringFilter<"Layout"> | string
  }

  export type LayoutOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    titleField?: SortOrder
    categoryField?: SortOrder
    typeField?: SortOrder
    amountField?: SortOrder
    dateField?: SortOrder
  }

  export type LayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: LayoutWhereInput | LayoutWhereInput[]
    OR?: LayoutWhereInput[]
    NOT?: LayoutWhereInput | LayoutWhereInput[]
    titleField?: StringFilter<"Layout"> | string
    categoryField?: StringFilter<"Layout"> | string
    typeField?: StringFilter<"Layout"> | string
    amountField?: StringFilter<"Layout"> | string
    dateField?: StringFilter<"Layout"> | string
  }, "id" | "name">

  export type LayoutOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    titleField?: SortOrder
    categoryField?: SortOrder
    typeField?: SortOrder
    amountField?: SortOrder
    dateField?: SortOrder
    _count?: LayoutCountOrderByAggregateInput
    _max?: LayoutMaxOrderByAggregateInput
    _min?: LayoutMinOrderByAggregateInput
  }

  export type LayoutScalarWhereWithAggregatesInput = {
    AND?: LayoutScalarWhereWithAggregatesInput | LayoutScalarWhereWithAggregatesInput[]
    OR?: LayoutScalarWhereWithAggregatesInput[]
    NOT?: LayoutScalarWhereWithAggregatesInput | LayoutScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Layout"> | string
    name?: StringWithAggregatesFilter<"Layout"> | string
    titleField?: StringWithAggregatesFilter<"Layout"> | string
    categoryField?: StringWithAggregatesFilter<"Layout"> | string
    typeField?: StringWithAggregatesFilter<"Layout"> | string
    amountField?: StringWithAggregatesFilter<"Layout"> | string
    dateField?: StringWithAggregatesFilter<"Layout"> | string
  }

  export type LayoutCreateInput = {
    id: string
    name: string
    titleField: string
    categoryField: string
    typeField: string
    amountField: string
    dateField: string
  }

  export type LayoutUncheckedCreateInput = {
    id: string
    name: string
    titleField: string
    categoryField: string
    typeField: string
    amountField: string
    dateField: string
  }

  export type LayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    titleField?: StringFieldUpdateOperationsInput | string
    categoryField?: StringFieldUpdateOperationsInput | string
    typeField?: StringFieldUpdateOperationsInput | string
    amountField?: StringFieldUpdateOperationsInput | string
    dateField?: StringFieldUpdateOperationsInput | string
  }

  export type LayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    titleField?: StringFieldUpdateOperationsInput | string
    categoryField?: StringFieldUpdateOperationsInput | string
    typeField?: StringFieldUpdateOperationsInput | string
    amountField?: StringFieldUpdateOperationsInput | string
    dateField?: StringFieldUpdateOperationsInput | string
  }

  export type LayoutCreateManyInput = {
    id: string
    name: string
    titleField: string
    categoryField: string
    typeField: string
    amountField: string
    dateField: string
  }

  export type LayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    titleField?: StringFieldUpdateOperationsInput | string
    categoryField?: StringFieldUpdateOperationsInput | string
    typeField?: StringFieldUpdateOperationsInput | string
    amountField?: StringFieldUpdateOperationsInput | string
    dateField?: StringFieldUpdateOperationsInput | string
  }

  export type LayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    titleField?: StringFieldUpdateOperationsInput | string
    categoryField?: StringFieldUpdateOperationsInput | string
    typeField?: StringFieldUpdateOperationsInput | string
    amountField?: StringFieldUpdateOperationsInput | string
    dateField?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type LayoutCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    titleField?: SortOrder
    categoryField?: SortOrder
    typeField?: SortOrder
    amountField?: SortOrder
    dateField?: SortOrder
  }

  export type LayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    titleField?: SortOrder
    categoryField?: SortOrder
    typeField?: SortOrder
    amountField?: SortOrder
    dateField?: SortOrder
  }

  export type LayoutMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    titleField?: SortOrder
    categoryField?: SortOrder
    typeField?: SortOrder
    amountField?: SortOrder
    dateField?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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