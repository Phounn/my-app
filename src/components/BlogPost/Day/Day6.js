import React, { useEffect, useState } from "react";

const BasicForm = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    alert(`Username is ${name}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please enter your name"
          value={name}
          name="username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
const MultipleInputsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`The data is sent ${JSON.stringify(formData)}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Name"
          value={formData.firstName}
          onChange={handleChange}
        ></input>
        <input
          name="lastName"
          placeholder="Lastname"
          value={formData.lastName}
          onChange={handleChange}
        ></input>
        <input
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
const SelectAndRadio = () => {
  const [selectedFruit, setSelectedFruit] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
        >
          <option value="">Fruit Selection</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
        {selectedFruit && <h4>{selectedFruit}</h4>}
        {/* {<h4>{selectedFruit}</h4>} */}
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label>Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label>Female</label>
          {gender && <h4>{gender}</h4>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
const ProductSearch = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const products = [
    {
      id: 1,
      name: "Phone",
      price: 5,
    },
    {
      id: 2,
      name: "Laptop",
      price: 7,
    },
    {
      id: 3,
      name: "PC",
      price: 9,
    },
    {
      id: 4,
      name: "Mouse",
      price: 11,
    },
    {
      id: 5,
      name: "Speaker",
      price: 11,
    },
  ];
  const [result, setResult] = useState([...products]);
  useEffect(() => {
    handleSearch();
  }, [sortOrder, priceFilter, currentPage]);

  const handleSearch = () => {
    let filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //Filter by price
    if (priceFilter.min !== "") {
      filterProducts = filterProducts.filter(
        (product) => product.price >= parseInt(priceFilter.min)
      );
    }
    if (priceFilter.max !== "") {
      filterProducts = filterProducts.filter(
        (product) => product.price <= parseInt(priceFilter.max)
      );
    }
    filterProducts.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    setResult(filterProducts);
  };
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const handlePriceFilterChange = (e) => {
    setPriceFilter({ ...priceFilter, [e.target.name]: [e.target.value] });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(result.length / itemsPerPage);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <label></label>
        <button type="submit">Find</button>
      </form>
      <div>
        <label>
          Order by price:{" "}
          <select onChange={handleSortChange}>
            <option value="asc">Price (min - max)</option>
            <option value="desc">Price (max - min)</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Min Price:{" "}
          <input
            type="number"
            name="min"
            value={priceFilter.min}
            onChange={handlePriceFilterChange}
          ></input>
        </label>
      </div>
      <div>
        <label>
          Max Price:{" "}
          <input
            type="number"
            name="max"
            value={priceFilter.max}
            onChange={handlePriceFilterChange}
          ></input>
        </label>
      </div>
      <ul>
        {currentItems.map((e, index) => ( // result
          <li key={e.id}>
            {e.id}. {e.name}'s price is {e.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Before</button>
        <span>Page {currentPage} by {totalPages}</span>

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Before</button>
        {/* <span>Page {currentPage} by {totalPages}</span> */}
      </div>
    </div>
  );
};
function Day6() {
  return (
    <div className="container">
      <h1>This is day 6</h1>
      <h2>basic form</h2>
      <BasicForm />
      <h2>MultipleInputs Form</h2>
      <MultipleInputsForm />
      <h2>Radio and Dropdown Selection</h2>
      <SelectAndRadio />
      <h2>Product Search</h2>
      <ProductSearch />

      <style jsx>
        {`
            .container{
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            form{
                margin-bottom: 20px; 
            }
            input, select {
                margin: 5px 0;
                padding 5px; 
            }
            button {
                margin-top: 10px;
                padding: 5px 10px;
                background-color: #4CAF50; 
                color: white;
                border: none;
                cursor: pointer;
                transition: ease-in-out 0.2s
            }
            .error{
                color: red;
                font-size: 20px;
            
            }
            ul{
                list-style-type: none;
                padding: 0;
                }
            li{
                margin: 5px 0;
                padding: 5px;
                background-color:#f0f0f0;
                border-radius: 3px;
            
            }

            
            `}
      </style>
    </div>
  );
}

export default Day6;
