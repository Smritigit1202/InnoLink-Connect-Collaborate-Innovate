import { useState } from "react";
import { Sidebar, Posts } from "../../components";
import "./style.scss";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <section className="home-page bg-neutral-50">
      <div className="content-container flex mx-auto">
        <div className="flex-[0_0_auto] mr-8">
          <div
            className={isLoading ? "main-content is-loading" : "main-content"}
          >
             <Posts />
          </div>
        </div>
        <div className="flex-[1_0_auto] relative">
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default Home;
