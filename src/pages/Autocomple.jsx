import React from 'react'

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

/* [
  "El Salvador",
  "Romania",
  "Taiwan, Province of China",
  "Qatar",
  "Yemen",
  "Lebanon",
  "Suriname",
  "South Africa",
  "Afghanistan",
  "Mozambique"
]

*/

function Autocomple() {
  return (
    <div className="wrapper">
      <div className="control">
        <input type="text" className="input" />
      </div>
      <div className="list is-hoverable">
        <a href="#" className="list-item">Item 1</a>
      </div>
    </div>
  )
}

export default Autocomple