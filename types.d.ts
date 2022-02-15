type AppResponse = {
  message: string;
  code: number;
};

interface APIResponse<T> { 
  payLoad: T;
}