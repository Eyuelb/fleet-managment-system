import { db } from "@db/index";
import { queryBuilder } from "@db/manage";
import { exampleUsage } from "@db/QueryBuilder";
import { users } from "@db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = await queryBuilder("users");
  const result = await query
  .select(["email", "name",'password'])
  .where([
    // {
    //   column: "name",
    //   operator: "ILIKE",
    //   value: "eyuel",
    // },
    {
      column: "email",
      operator: "LIKE",
      value: "user",
    },
  ])
   .orderBy(["name"], ["ASC"])
  .limit(3)
  .offset(1)
  .build();
   console.log(result.data);
  // console.log(result.data[0]);
  return NextResponse.json(result,{status: 200});
}
