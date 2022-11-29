import { ISQLTable } from './ISQLTable';

function staticImplements<T>() {
    return <U extends T>(constructor: U) => {constructor};
}

@staticImplements<ISQLTable>()
// @ts-ignore
export class Contact {

    id: number;
    firstName: string;
    lastName: string;

    public static toSQLCreateScript(): string {
        return `
            create table contact (
                id int primary key not null,
                firstName text not null,
                lastName text not null
            );

            insert into contact (id, firstName, lastName)
                values (1, 'Marcel', 'Patoulachi'),
                    (2, 'Hector', 'Dugoulou'),
                    (3, 'Jean', 'Grey');
        `;
    }

}