import { createClient } from "edgedb";

import e from "../dbschema/edgeql-js";

export * from "../dbschema/edgeql-js";
export * from "../dbschema/interfaces";

const client = createClient();

export { client, e };
