declare namespace API {
  type addUsingGETParams = {
    /** name */
    name?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseListMapStringObject_ = {
    code?: number;
    data?: MapStringObject_[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    genChart?: string;
    genResult?: string;
    id?: string;
  };

  type Chart = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    userId?: string;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
    name?: string;
  };

  type ChartQueryRequest = {
    chartData?: string;
    chartType?: string;
    current?: number;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
    name?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type genChartByAiAsyncMqUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiAsyncUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genUpdateChartByAiAsyncUsingPOSTParams = {
    chartId?: string;
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getChartInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MapStringObject_ = true;

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Chart[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type User = {
    createTime?: string;
    id?: string;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: string;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
