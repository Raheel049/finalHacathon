import React from "react";
import StatusCard from "../../components/sameComponent/StatusCard";
import styles from "./Owner.module.css";
import {
  LuUsers,
  LuUserCheck,
  LuUserMinus,
  LuUserX,
  LuSearch,
} from "react-icons/lu";

const Owners = () => {
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
              <button>Button text</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Owners;
