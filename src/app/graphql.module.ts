import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { inject, NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<any> {
  const uri = 'http://localhost:8080/graphql';// nhập url của GraphQL server
  const httpLink = inject(HttpLink);// inject httpLink: để frontend sử dụng http liên kết đến GraphQL server

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),// cache cho appolo client
  };
}

@NgModule({
  providers: [provideApollo(createApollo)],// đăng ký cấu hình apollo client để Angular DI (dependency injection) có thể sử dụng ở mọi nơi trong app
})
export class GraphQLModule {}
/**
 * Mục đích của GraphQLModule này được tạo ra khi chạy lệnh "ng add apollo-angular": nó dùng để đăng ký apollo cient
 * Sau đó thằng nào mà muốn dùng GraphQL - tức cần dùng apollo để call GraphQL thì chỉ cần Import nó.
 * Còn về "apollo/graphQL" thì nó khá giống như "axios/http"
 */