import { getCurrentUserSession } from "@lib/supabase/auth/actions";
import supabase from "@lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Use this method on api routes to check if user is authenticated and having required permissions.
 * This method can only be used from the server side.
 * Member permission is mandatory whenever orgSlug/projectRef query param exists
 * @param {NextRequest}    req
 * @param {Object}            config      requireUserDetail: bool, requireOwner: bool
 *
 * @returns {Object<user, error, description>}
 *   user null, with error and description if not authenticated or not enough permissions
 */
export async function apiAuthenticate(req: NextRequest) {
  if (!req) {
    return { error: new Error("Request is not available") };
  }

  try {
    const user = await getCurrentUserSession();
    if (!user) {
      throw new Error("The user does not have permission");
    }
    return user;
  } catch (error: any) {
    console.error("Error at apiAuthenticate", error);
    throw new Error(error.message ?? "unknown");
  }
}
// /**
//  * @returns
//  *  user with only id prop or detail object. It depends on requireUserDetail config
//  */
// async function fetchUser(req: NextApiRequest, res: NextApiResponse): Promise<any> {
//   let user_id_supabase = null
//   let user_id_auth0 = null
//   let gotrue_id = null
//   let email = null

//   const token = req.headers.authorization
//   if (!token) {
//     throw new Error('missing access token')
//   }
//   let { user: gotrue_user, error: authError } = await getAuthUser(token)
//   if (authError) {
//     throw authError
//   }
//   if (gotrue_user !== null) {
//     gotrue_id = gotrue_user?.id
//     email = gotrue_user.email

//     let { identity, error } = getIdentity(gotrue_user)
//     if (error) throw error
//     if (identity?.provider !== undefined) {
//       user_id_auth0 = getAuth0Id(identity?.provider, identity?.id)
//     }
//   }

//   if (user_id_supabase) {
//     return {
//       id: user_id_supabase,
//       primary_email: email,
//     }
//   }

//   const query = readOnly.from('users').select(
//     `
//       id, auth0_id, primary_email, username, first_name, last_name, mobile, is_alpha_user
//     `
//   )

//   const { data } = await query.eq('gotrue_id', gotrue_id).single()
//   return data
// }

// async function checkMemberPermission(req: NextApiRequest, user: any) {
//   const org = await getOrganization(req)
//   if (!org) {
//     throw new Error('User organization does not exist')
//   }

//   try {
//     const response = await readOnly
//       .from('members')
//       .select('id')
//       .match({ organization_id: org.id, user_id: user.id })
//       .single()

//     if (!response || response.status != 200) {
//       throw new Error('The user does not have permission')
//     }
//     return true
//   } catch (error) {
//     throw new Error('The user does not have permission')
//   }
// }

// async function getOrganization(req: NextApiRequest) {
//   const { slug: orgSlug, ref: projectRef } = req.query
//   if (!orgSlug && !projectRef) {
//     throw new Error('Not enough info to check user permissions')
//   }

//   if (orgSlug) {
//     const { data } = await readOnly
//       .from('organizations')
//       .select('id')
//       .match({ slug: orgSlug })
//       .single()
//     return { id: data.id }
//   }

//   if (projectRef) {
//     const { data } = await readOnly
//       .from('projects')
//       .select('organization_id')
//       .match({ ref: projectRef })
//       .single()
//     return { id: data.organization_id }
//   }

//   return null
// }
