import React, { useEffect, useState } from "react";
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

const Owners = () => {
  const [allOwners, setAllOwners] = useState([]);
  const [loding, setLoading] = useState(false);

  const allUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/super-admin/fetch-all-owners")
      console.log(res.data.data);
      setAllOwners(res.data.data);
      if (res.data.status === true || res.status === 200)
        toast.success(res.data.message || "All Owners Founded");
      setLoading(false);
    } catch (error) {
      const errMsg = error.res?.data?.message || "some thing went wrong";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log(id)
  }

  console.log("owners", allOwners);

  useEffect(() => {
    allUsers();
  }, []);

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
                  
                />
              </div>
            </div>
            <div className={styles.filterAll}>
              <label htmlFor="statusFilter">Status Filter</label>
              <select id="statusFilter" className={styles.filterSelect}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className={styles.addOwnerBtn}>
              <button>Add Owner</button>
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

            {loding ? (
              <p>Loading...</p>
            ) : (
              <div>
                {allOwners.map((owner, index) => (
                  <div className={styles.ownerDetails} key={owner._id}>
                    <h5>{index+1}</h5>
                    <p>
                      {owner.ownerName}
                      <span className={styles.email}>
                        {owner.ownerEmail}
                      </span>
                    </p>
                    <p>{owner.hospitalName}</p>
                    <p>{owner.plane}</p>
                    <p>{owner.status}</p>
                    <span>
                      <button onClick={() => {handleEdit(owner._id)}}>
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
