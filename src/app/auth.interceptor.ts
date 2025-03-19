import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token'); 
  console.log(accessToken,'accessToken')
  console.log(refreshToken,'refreshToken')
  const newReq = req.clone({
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',  
      'Refresh-Token': refreshToken ? `refresh_token ${refreshToken}` : '',  
    },
  });


  return next(newReq);
};
