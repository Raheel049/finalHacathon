import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "../../components/sameComponent/StatusCard";
import styles from "./Owner.module.css";
import {
  LuUsers,
  LuUserCheck,
  LuUserMinus,
  LuUserX,
  LuSearch,
  LuPencilLine,
  LuEye,
  LuBan,
} from "react-icons/lu";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Owners = () => {
  const [allOwners, setAllOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [ownerAllCardStats, setOwnerAllCardStats] = useState("");
  const [updateOwnerFields, setupdateOwnerFields] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();

  const allUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/super-admin/fetch-all-owners");
      console.log(res.data.data);
      setAllOwners(res.data.data);
      if (res.data.status === true || res.status === 200)
        console.log(res.data.message || "All Owners Founded");
      setLoading(false);
    } catch (error) {
      const errMsg = error.response?.data?.message || "some thing went wrong";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const ownerCardsStats = async () => {
    try {
      const res = await axiosInstance.get("/super-admin/owner-stats");
      setOwnerAllCardStats(res.data.data)
    console.log("stats", res.data.data);

    } catch (error) {
      console.log("error", error.message || "some thing went wrong");
    }

  }

  console.log("allStats",ownerAllCardStats.totalOwners);

  var filteredOwners = useMemo(() => {
    const searchLower = searchItem.toLowerCase();
    const selectedItemLower = selectedItem.toLowerCase();

    return allOwners.filter((owner) => {
    const matchesSearchLower =
      owner.OwnerName?.toLowerCase().includes(searchLower) ||
      owner.ownerEmail?.toLowerCase().includes(searchLower) ||
      owner.hospitalName?.toLowerCase().includes(searchLower);

    const matchesSelectedLower =
      selectedItemLower === "" || 
      selectedItemLower === "all" ||
      owner.plane?.toLowerCase() === selectedItemLower ||
      owner.status?.toLowerCase() === selectedItemLower;

    // console.log(searchItem)
    return matchesSearchLower && matchesSelectedLower;
  }); 
  }, [allOwners, searchItem, selectedItem]);
    

  const handleEdit = async (id) => {
    try {
      const res = await axiosInstance.post(`/super-admin/get-owner-data/${id}`);
      // console.log(res.data.data)
      setupdateOwnerFields(res.data.data)


      if(res.data.status === 200 || res.data.status === true){
        toast.success(res.data.message || "owner data found");
      // console.log("handleEdit", res.data.data)

      setIsOpen(true)



      }
      
    } catch (error) {
      const errMsg = error.response?.data?.message || "some thing went wrong";
      toast.error(errMsg);
    }
  };



  // console.log("owners", allOwners);

  useEffect(() => {
    allUsers();
    ownerCardsStats();
  }, []);

  const handleUpdateChange = (e) => {
    // setupdateOwnerFields(...updateOwnerFields, [e.target.name] = e.target.value);

    const {name, value} = e.target;

    setupdateOwnerFields((prev) => ({
      ...prev, [name] : value
      
    }))

    // console.log("updatedData",updateOwnerFields)


  }

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  const closePopup = () => {
    setIsOpen(false)
  }

  const handleSave = async ()  => {
    try {
      const idToUpgrade = updateOwnerFields._id
    // console.log("idTOUpdgrrade",idToUpgrade); 
    const updatedObj = {
      ownerName : updateOwnerFields.ownerName,
      hospitalName : updateOwnerFields.hospitalName, 
      status : updateOwnerFields.status, 
      plane : updateOwnerFields.plane, 

    }
    const res = await axiosInstance.patch(`/super-admin/update-owner-data/${idToUpgrade}`,updatedObj);
    console.log("update res",res)

    if(res.data.status === true || res.data.status === 200){
    toast.success(res.data.message || "Hospital owner data Updated successfully");

      allUsers();
    setIsOpen(false);
    ownerCardsStats()

    }
    

    } catch (error) {
      toast.error(error.message)
    }
  }

  const handlDeleteOwner = async (id) => {
    try {
      const response = await axiosInstance.delete(`/super-admin/delete-owner/${id}`);
      console.log("response", response);
      if(response.data.status === 200 || response.data.status === true){
        toast.success(response.data.message || "Hospital owner deleted Successfully")
      allUsers();
      ownerCardsStats();

      }
    } catch (error) {
      toast.error(error.message || "some thing went wrong")
    }
  }

  return (
    <div className={styles.mainContainer}>
      <main>
        <section>
          <div>
            <h1>Owner Management</h1>
            <p>Manage all registered hospital owners and access</p>
            <div className={styles.statusCards}>
              <StatusCard
                title={"Total Owners"}
                value={`${ownerAllCardStats.totalOwners}`}
                icon={<LuUsers className={styles.cardIconUsers} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Active Owners"}
                value={`${ownerAllCardStats.active}`}
                icon={<LuUserCheck className={styles.cardIconUserCheck} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Inactive Owners"}
                value={`${ownerAllCardStats.inactive}`}
                icon={<LuUserMinus className={styles.cardIconUserMinus} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Blocked Owners"}
                value={`${ownerAllCardStats.blocked}`}
                icon={<LuUserX className={styles.cardIconUserX} />}
                variant={"redVariant"}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.sectionTwo}>
            <div className={styles.searchBarContainer}>
              <label htmlFor="Controls">Controlls</label>

              <div className={styles.searchBar}>
                <LuSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search Owners,name,email,hospital..."
                  onChange={handleChange}
                  value={searchItem}
                />
              </div>
            </div>
            <div className={styles.filterAll}>
              <label htmlFor="statusFilter">Status Filter</label>
              <select
                id="statusFilter"
                className={styles.filterSelect}
                onChange={(e) => {
                  setSelectedItem(e.target.value);
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
                <option value="basic">Basic</option>
                <option value="enterprise">Enterprise</option>
                <option value="standard">Standard</option>
              </select>
            </div>
            <div className={styles.addOwnerBtn}>
              <button onClick={() => {navigate("/SuperAdmin/RegisterHospitals")}}>Add Owner</button>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.tableContainer}>
          <div className={styles.section3}>
            <div className={styles.ownerDetailsHeading}>
              <h5>S/No</h5>
              <p>Name/Email</p>
              <p>Assignd Hospital</p>
              <p>Subscription plane</p>
              <p>Status</p>
              <span>Action</span>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {filteredOwners.map((owner, index) => (
                  <div className={styles.ownerDetails} key={owner._id}>
                    <h5>{index + 1}</h5>
                    <p>
                      {owner.ownerName}
                      <span className={styles.email}>{owner.ownerEmail}</span>
                    </p>
                    <p>{owner.hospitalName}</p>
                    <p>{owner.plane}</p>
                    <p>{owner.status}</p>
                    <span>
                      <button
                        onClick={() => {
                          handleEdit(owner._id);
                        }}
                      >
                        <LuPencilLine className={styles.editIcon} />
                        Edit
                      </button>
                      <button>
                        <LuEye className={styles.viewIcon} />
                        view
                      </button>
                      <button onClick={() => {handlDeleteOwner(owner._id)}}>
                        <LuBan className={styles.blockIcon} />
                        Delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>

          {isOpen && (<div className={styles.modalOverlay}>
            <div className={styles.UpdatePopUp}>
            <h1>Update Owner Fields</h1>

            <input type="text" onChange={handleUpdateChange} value={updateOwnerFields.ownerName} name="ownerName"/>
            <input type="text" onChange={handleUpdateChange} value={updateOwnerFields.hospitalName} name="hospitalName" />
            <select name="plane" id="" onChange={handleUpdateChange}>
              <option value="Basic">Basic</option>
              <option value="Standrad">Standrad</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <select name="status" id="" onChange={handleUpdateChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>

            <div className={styles.btn}>
              <button onClick={closePopup}>Close</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
          </div>) }
        </section>
      </main>
    </div>
  );
};

export default Owners;
