import Head from "next/head";
import React from "react";
import axios from "axios";
import { useQueries } from "react-query";
import { BiUser } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
import { ImGithub } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import Pagination from "@/components/pagination/pagination";
import EmptyState from "@/components/empty-state/empty-state";
import LoadingState from "@/components/loading-state/loading-state";
import { abbrevNum } from "../helper";

export default function Home() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [username, setUsername] = React.useState<string>("");

  const handleSearch = (e: any) => {
    if (e.key === "Enter") {
      setUsername(e.target.value);
      setCurrentPage(1);
    }
  };

  const fetchProfile = (search: string) => {
    const response = axios.get(`https://api.github.com/users/${search}`);

    return response;
  };

  const fetchRepos = (search: string, page = 1) => {
    const response = axios.get(
      `https://api.github.com/users/${search}/repos?per_page=4&page=${page}`
    );

    return response;
  };

  const [profileQuery, repoQuery] = useQueries([
    {
      queryKey: ["profile", username],
      queryFn: () => fetchProfile(username),
      // keepPreviousData: true,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnMount: false,
    },
    {
      queryKey: ["repos", username, currentPage],
      queryFn: () => fetchRepos(username, currentPage),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnMount: false,
    },
  ]);

  const {
    data: profileData,
    isSuccess: profileSuccess,
    isLoading: profileLoading,
    isError: profileError,
  } = profileQuery;
  // console.log(profileData, "profileQuery");
  // console.log(repoQuery?.data.data, "repoQuery");
  const {
    data: repoData,
    isSuccess: repoSuccess,
    isLoading: repoLoading,
    isError: repoError,
  } = repoQuery;
  console.log(repoData);

  // console.log(profileQuery, repoQuery);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderView = () => {
    if (profileLoading || repoLoading) {
      return <LoadingState />;
    }
    if (!profileSuccess && !repoSuccess) {
      return <EmptyState caption="User not found" Icon={BiUser} />;
    }

    if (profileSuccess && repoSuccess) {
      if (repoData?.data.length === 0) {
        return (
          <div
            className="max-w-128 px-5 mx-auto flex"
            style={{ height: "100%" }}
          >
            <div className="w-2/6 py-8">
              <div className="h-60 w-60 mb-5">
                <img
                  src={profileData?.data?.avatar_url}
                  alt="profile"
                  className="h-60 w-60 rounded-full"
                />
              </div>

              <h2 className="mb-2 font-semibold text-2xl">
                {profileData?.data?.name}
              </h2>
              <p className="text-lg text-blue mb-7 cursor-pointer">
                <a
                  target="_blank"
                  href={`${profileData?.data?.html_url}`}
                  rel="noopener noreferrer"
                >
                  {profileData?.data?.login}
                </a>
              </p>

              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <MdGroup fontSize={20} />
                  <span className="text-sm">
                    {abbrevNum(profileData?.data?.followers)} followers
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <BsFillPersonFill />
                  <span className="text-sm">
                    {profileData?.data?.following} following
                  </span>
                </div>
              </div>
            </div>
            <div className="w-4/6 flex flex-col justify-between">
              <EmptyState
                caption="Repository list is empty"
                Icon={FaRegWindowClose}
              />
            </div>
          </div>
        );
      }

      return (
        <div
          className="max-w-128 px-5 mx-auto flex pt-8 pb-8"
          style={{ height: "100%" }}
        >
          <div className="w-2/6">
            <div className="h-60 w-60 mb-5">
              <img
                src={profileData?.data?.avatar_url}
                alt="profile"
                className="h-60 w-60 rounded-full"
              />
            </div>

            <h2 className="mb-2 font-semibold text-2xl">
              {profileData?.data?.name}
            </h2>
            <p className="text-lg text-blue mb-7 cursor-pointer">
              <a
                target="_blank"
                href={`${profileData?.data?.html_url}`}
                rel="noopener noreferrer"
              >
                {profileData?.data?.login}
              </a>
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <MdGroup fontSize={20} />
                <span className="text-sm">
                  {abbrevNum(profileData?.data?.followers)} followers
                </span>
              </div>
              <div className="flex items-center gap-1">
                <BsFillPersonFill />
                <span className="text-sm">
                  {profileData?.data?.following} following
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-4/6 flex flex-col justify-between"
            // style={{ border: "1px solid red" }}
          >
            <div>
              <h1 className="text-3xl font-semibold mb-3">
                Repositories ({profileData?.data?.public_repos})
              </h1>
              <div>
                {repoData?.data.map((item: any, i: number) => {
                  return (
                    <div key={i} className="mb-5 py-5 px-6 bg-white">
                      <h4 className="mb-1.5 text-blue text-xl font-medium cursor-pointer">
                        <a
                          target="_blank"
                          href={`${item.html_url}`}
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </a>
                      </h4>
                      <p className="text-base truncate">
                        {item.description ? item.description : "N/A"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <Pagination
                currentPage={currentPage}
                totalCount={profileData?.data?.public_repos}
                pageSize={4}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>LorChain</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <div className="bg-blue pt-3 pb-3">
        <div className="max-w-128 px-5 mx-auto text-2xl flex items-center gap-5">
          <ImGithub color="#fff" fontSize={30} />
          <div className="w-[400px] relative">
            <input
              type="text"
              className="w-full bg-white rounded-md outline-none border-none pt-1.5 pb-1.5 text-sm pl-12"
              placeholder="Enter GitHub username"
              onKeyDown={handleSearch}
            />
            <FiSearch
              className="text-primaryText absolute top-2.5 left-4"
              fontSize={18}
            />
          </div>
        </div>
      </div>

      <main
        className="bg-grey"
        style={{
          // minHeight: "calc(100vh - 56px)",
          height: "calc(100vh - 56px)",
        }}
      >
        {username === "" ? (
          <EmptyState
            caption="Start with searching
            a GitHub user"
            Icon={FiSearch}
          />
        ) : (
          renderView()
        )}
      </main>
    </>
  );
}
