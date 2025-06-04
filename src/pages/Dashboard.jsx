import { useLoaderData } from "react-router";

import withWallet from "../hoc/withWallet";

// async function loader({ request }) {
//   console.log('request: ', request)
//   return {
//     message: "Hello from loader",
//   }
// }

function Dashboard(props) {
  const dataSource = useLoaderData();
  console.log('Dashboard props: ', props)
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSource.carts.map(item => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.products[0].title}
              </th>
              <td className="px-6 py-4">${item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DashboardHOC = withWallet(Dashboard)

export default DashboardHOC