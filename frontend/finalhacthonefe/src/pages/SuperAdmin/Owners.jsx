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
  const [totalOwners, setTotalOwners] = useState("");

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

  const totalOwners = () => {
    try {
      const res = axiosInstance.get("/super-admin/owner-stats");
    } catch (error) {
      message : error.message || ""
    }
  }

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
    

  const handleEdit = (id) => {
    console.log(id);
  };

  // console.log("owners", allOwners);

  useEffect(() => {
    allUsers();
  }, []);

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

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
                value={"23"}
                icon={<LuUsers className={styles.cardIconUsers} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Active Owners"}
                value={"13"}
                icon={<LuUserCheck className={styles.cardIconUserCheck} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Inactive Owners"}
                value={"7"}
                icon={<LuUserMinus className={styles.cardIconUserMinus} />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Blocked Owners"}
                value={"6"}
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
                      <button>
                        <LuBan className={styles.blockIcon} />
                        Block
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Owners;
