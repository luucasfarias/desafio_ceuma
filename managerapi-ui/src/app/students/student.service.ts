import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class StudentFilter {
  nameSearch: string;
  cpfSearch: string;
  page = 0;
  itemsPage = 6;
}

@Injectable()
export class StudentService {

  studentsUrl = 'http://localhost:8080/students';

  constructor(private http: Http) { }

  searchStudents(filter: StudentFilter): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2V1bWEuY29tOmFkbWlu');

    params.set('page', filter.page.toString());
    params.set('size', filter.itemsPage.toString());

    if (filter.nameSearch) {
      params.set('name', filter.nameSearch);
    }

    if (filter.cpfSearch) {
      params.set('cpf', filter.cpfSearch);
    }
    return this.http.get(`${this.studentsUrl}?`, { headers, search: params })
      .toPromise().then(response => {
        const responseJson = response.json();
        const students = responseJson.content;
        console.log('students: ', students);

        const result = {
          data: students,
          total: responseJson.totalElements
        };

        return result;
      });
  }

  deleteStudents(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2V1bWEuY29tOmFkbWlu');

    return this.http.delete(`${this.studentsUrl}/${id}`, { headers })
      .toPromise().then(() => null);
  }
}
