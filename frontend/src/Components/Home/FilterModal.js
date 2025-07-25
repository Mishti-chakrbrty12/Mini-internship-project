import React, {useEffect, useState} from "react";
import PropTypes from "prop-types"; //for type-checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css"; //importing css file for input range styling
import InputRange from "react-input-range";

const FilterModal = ({selectedFilters, onFilterChange, onClose}) => {
  const [priceRange, setPriceRange]= useState ({
    min: selectedFilters.priceRange?.min || 600,
    max: selectedFilters.priceRange?.max ||30000,
});

  const  [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || "" //default it is empty or the selected property type from props
  );

  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
  const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

//useEffect hhok to update states when selectedFilters prop changes
useEffect(()=>{
  setPriceRange({
    min:selectedFilters.priceRange?.min ||600,
    max: selectedFilters.priceRange?.max || 30000,
  });
  setPropertyType(selectedFilters.propertyType || "");
  setRoomType(selectedFilters.roomType ||"");
  setAmenities(selectedFilters.amenities || []);
}, [selectedFilters]);

//function to handle changes in price range
const handlePriceRangeChange =(value)=>{
  setPriceRange(value) //it will update the price range state
  };

//function to handle min value
const handleMinInputChange = (e) =>{
  const minValue =parseInt(e.target.value,10);
  setPriceRange((prev) => ({...prev, min: minValue}));
};
//function to handle max value
 const handleMaxInputChange =(e)=>{
  const maxValue =parseInt(e.target.value,10);
  setPriceRange((prev) => ({...prev, max: maxValue}));
 };
 //functin to handle applying filters
 const handleFilterChange =()=>{
  onFilterChange("minPrice", priceRange.min);
  onFilterChange("maxPrice", priceRange.max);
  onFilterChange("propertyType" , propertyType);
  onFilterChange("roomType", roomType);
  onFilterChange("amenities", amenities);
  onClose(); //closes the modal
};

//options for property types
const propertyTypesOptions =[
  {value: "House", label: "House", icon:"house",},
  {value:"Flat", label:"Flat", icon:"apartment",},
  {value:"Guest House", label:"Guest House", icon:"hotel", },
  {value:"Hotel", label:"Hotel", icon:"meeting_room", },
];

//options for room types

const roomTypeOptions=[
  {
    value: "Entire Room",
    label: "Entire Room",
    icon: "hotel",
  },
  { value:"Room", label:"Room", icon:"meeting_room"},
  {value:"AnyType", label:"AnyType", icon:"apartment"},

];

//options for amenties
const amenitiesOptions= [
  {value:"Wifi", label:"Wifi", icon:"wifi"},
{value:"Kitchen", label: "Kitchen", icon:"kitchen"},
{value:"Ac", label:"AC", icon:"ac_unit"},
  {value:"Washing Machine", label:"Washing Machine", icon:"local_laundry_service"},
  {value:"Tv", label:"Tv", icon:"tv"},
  {value:"Pool", label:"Pool", icon:"pool"},
  {value:"Free Parking", label:"Free Parking", icon:"local_parking"}
];

//function to handle clearing filters
const handleClearFilters =()=>{
  setPriceRange({min:600, max:30000}); //reset the range
  setPropertyType("");
  setRoomType("");
  setAmenities([]);
};

//functions to handle changes in amenities
const handleAmenitiesChange=(selectedAmenity)=>{
  setAmenities((prevAmenities)=> prevAmenities.includes(selectedAmenity)? prevAmenities.filter((item) => item!==selectedAmenity):[...prevAmenities,selectedAmenity]);
};

//function to handle changes in property type
const handlePropertyTypeChange=(selectedType) =>{
  setPropertyType((prevType)=>
    (prevType ===selectedType? "": selectedType));
};

//function to handle room type
const handleRoomTypeChange=(selectedType) =>{
  setRoomType((prevType)=>
    (prevType ===selectedType? "": selectedType));
};
  return (
    <div
      className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
  <button className="close-button" onClick={onClose}>×</button>
  <h2 className="modal-title">Filters</h2>
</div>

<hr />


          {/*Filter Section*/}
          <div className="modal-filters-container">
            <div className="filter-section">
              <label>
                Price range:
              </label>
              <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              />
              <div className="range-inputs">
                <input type="number"
                value={priceRange.min}
                onChange ={handleMinInputChange}
                />
                <span>-</span>
                <input type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange}
                />
                </div>
            </div>

            {/*Property type filter*/}
            <div
              className="filter-section">
                <label>Property Type:</label>
                <div className= "icon-box">
                  {propertyTypesOptions.map((options)=>
                  <div key={options.value}
                  className={`selectable-box ${propertyType== options.value ? "selected":""}`}
                  onClick={()=>handlePropertyTypeChange(options.value)}
                  >
                    <span className="material-icons">{options.icon}</span>
                    <span>{options.label}</span>



                  </div>

                    )};
                </div>
            </div>

            {/*room type filter*/}
            <div className="filter-section">
              <label>Room Type:</label>
              <div className="icon-box">
                {
                  roomTypeOptions.map((options)=>(
                    <div 
                    key={options.value}
                    className={`selectable-box ${
                      roomType ==options.value ? "selected": ""} 
                    }`}
                    onClick={()=>handleRoomTypeChange(options.value)}>
                      <span className= "material-icons">{options.icon}</span>
                      <span>{options.label}</span>
                    </div>

                  ))
                }
              </div>
            </div>

            {/*amenities filter*/}
            <div className="filter-section">
              <label>Amenities</label>
              <div className= "amenities-checkboxes">
                {amenitiesOptions.map((option)=>(
                  <div key={option.value} className="amenity-checkbox">
                    {console.log(amenities.includes(option.value))}

                    <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={()=> handleAmenitiesChange(option.value)}
                    />
                    <span className="material-icons amenitieslabel">
                      {option.icon}
                    </span>
                    <span> {option.label}</span>
                    </div>
                ))}
              </div>
            </div>

            {/*filter action button*/}
            <div className= "filter-buttons">
              <button className="clear-button" onClick={handleClearFilters}>
                Clear
              </button>
              <button onClick={handleFilterChange}> Apply Filters</button>
            </div>



          </div>
          
        </div>
    </div>
  );
};

FilterModal.propTypes={
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal;
