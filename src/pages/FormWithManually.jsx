import React from 'react'

function FormWithManually() {
  return (
    <>
      <h2 className="font-semibold text-xl text-gray-600 mb-2">Manually Form With React</h2>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>
            <form className="lg:col-span-2">
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div> 
    </>
  )
}

export default FormWithManually