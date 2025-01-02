import React from 'react'

import { awaitTime } from '../utils/awaitTime'

async function addUser(prevState, formData) {
  const role = formData.get('role');
  const firstName = formData.get('first_name');
  const lastName = formData.get('last_name');
  const email = formData.get('email');
  
  // fake api
  try {
    await awaitTime(2000);
    const user = {
      firstName,
      lastName,
      email,
      role,
      id: Math.random().toString(36).substr(2, 9),
    }
    const users = [...prevState?.users || [], user];
    return {
      users,
      error: null
    }
  } catch(err) {
    return {
      users: prevState?.users || [],
      error: 'Failed to add user'
    }
  }
}

function FormWithUseActionState() {
  const [state, submitAction, isPending] = React.useActionState(addUser, null)

  return (
    <>
      <h2 className="font-semibold text-xl text-gray-600 mb-2">Form with useActionState</h2>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Personal Details</p>
            <p>Please fill out all the fields.</p>
          </div>
          <form className="lg:col-span-2" action={submitAction}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="email@domain.com"
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="city">Role</label>
                <select
                  id="role"
                  name="role"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  <option selected>Choose Role</option>
                  <option value="admin">
                    Admin
                  </option>
                  <option value="member">Member</option>
                  <option value="operator">Operator</option>
                </select>
              </div>

              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                  </button>
                </div>
              </div>
              
            </div>
          </form>
        </div>

        {!isPending && state?.error && (
          <div class="w-full p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {state.error}
          </div>
        )}
      </div> 
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">First Name</th>
                    <th scope="col" className="px-6 py-3">Last Name</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <td colSpan="4">
                    <div className="w-full flex justify-center p-5">
                      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                 
                  {state?.users.map(user => (
                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.firstName}
                      </th>
                      <td class="px-6 py-4">
                        {user.lastName}
                      </td>
                      <td class="px-6 py-4">
                        {user.email}
                      </td>
                      <td class="px-6 py-4">
                        {user.role}
                      </td>
                    </tr>
                  ))}
                </>
              )}
              
            </tbody>
        </table>
    </div>
    </>
  )
}

export default FormWithUseActionState