import { ISQLTable, staticImplements } from './ISQLTable';

@staticImplements<ISQLTable>()
export class Contact {

    id: number;
    firstName: string;
    lastName: string;

    public static toSQLCreateScript(): string {
        return `
            create table contact (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName text NOT NULL,
                lastName text NOT NULL
            );

            insert into contact (id, firstName, lastName)
                values (1, 'Marcel', 'Patoulachi'),
                    (2, 'Hector', 'Dugoulou'),
                    (3, 'Jean', 'Grey');
        `;
    }

}