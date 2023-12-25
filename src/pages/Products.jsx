import useLoadSecureData from "../Hooks/useLoadSecureData";
import ProductCard from "../components/ProductCard";
import LayoutContainer from "../Layout/LayoutComponent/LayoutContainer";
import { useEffect, useState } from "react";

const Products = () => {
  const [showData, setShowData] = useState([])
  const [filterBy, setFilterBy] = useState('')

  const productsURL = "/products";
  const { data: products } = useLoadSecureData(productsURL);

  useEffect(()=>{
    setShowData(products?.slice(0, 12))
  }, [products])

  const handleShow = () => {
    setShowData(products)
    const show = document.getElementById("btn")
    show.classList.remove("flex")
    show.classList.add("hidden")
  }

  const handleFilter = () => {
    const data = document.getElementById("filter").value
    setFilterBy(data.toLowerCase())
    if(data){
      const searchInput = document.getElementById("search")
      searchInput.classList.remove("hidden")
      searchInput.classList.add("flex", "justify-end")
    }
  }

  const handleFilterText =(e) => {
    e.preventDefault()
    const text = e.target.value.toLowerCase()
    const filterData = products?.filter(product => {
      if(filterBy === "brand"){
        return (product?.brand.toLowerCase().includes(text));
      }
      else if(filterBy === "model"){
        return (product?.model.toLowerCase().includes(text));
      }
      else if(filterBy === "type"){
        return (product?.type.toLowerCase().includes(text));
      }
      else if(filterBy === "processor"){
        return (product?.processor.toLowerCase().includes(text));
      }
      else if(filterBy === "OS"){
        return (product?.OS.toLowerCase().includes(text));
      }
      else if(filterBy === "memory"){
        return (product?.memory >= parseFloat(text));
      }
      else if(filterBy === "price"){
        return (product?.price_usd < parseFloat(text));
      }
    })
    setShowData(filterData);
    const show = document.getElementById("btn")
    show.classList.remove("flex")
    show.classList.add("hidden")
  }

  return (
    <div className="bg-gray-800">
      <LayoutContainer>
        <div className="pt-24 flex justify-end items-center">
          <h2 className="text-xl text-center text-white mr-4">Filter</h2>
          <form onChange={handleFilter}>
          <select id="filter" className="w-40 h-10 px-2 text-white focus:outline-none rounded" name="filter">
            <option>Select</option>
            <option value="Model">Model</option>
            <option value="Brand">Brand</option>
            <option value="Type">Type</option>
            <option value="Processor">Processor</option>
            <option value="Memory">Memory</option>
            <option value="OS">OS</option>
            <option value="Price">Price</option>
          </select>
          </form>
        </div>
          <div id="search" className="mt-4 hidden"><input onChange={handleFilterText} className="w-60 h-10 focus:outline-none px-4 text-lg text-white placeholder:text-white rounded" type="text" name="filterText" placeholder="Search" /></div>
        <h2 className="text-4xl text-center text-white border-b-4 pb-4">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {showData?.map((product) => (
            <ProductCard key={product?._id} product={product}></ProductCard>
          ))}
        </div>
        <div id="btn" className="flex justify-center items-center"><button onClick={handleShow} className="btn bg-gray-500 text-white mb-10">Show All Mobiles</button></div>
      </LayoutContainer>
    </div>
  );
};

export default Products;
