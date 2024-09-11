import React, { useEffect, useState } from "react";
import {
  Navbar as BSNavbar,
  Col,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { If, Show, useMediaQuery } from "react-haiku";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MovieDom, { LOGO_PATH, LOGO_WIDTH } from "../../../Api/MovieDom";
import { getServerImgPath } from "../../../lib/tools";
import { Button } from "../../../style/common/Button";
import { A, StyledNavLink, Tag, Tags } from "../../../style/common/Tag";
import {
  DropMenu,
  Header,
  Logo,
  NavMenu,
  SearchBox,
} from "../../../style/layout/Navbar";
import theme from "../../../style/theme";
import { P } from "../../../style/typography/typography";
import Image from "../common/Image";

function SearchData({ search, hide_search_list, handle_hide_search_list }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (hide_search_list) {
      setData([]);
    } else {
      if (search) {
        MovieDom.getSearchItems({ search, limit: 10 }).then((dt) =>
          setData(dt)
        );
      } else {
        setData([]);
      }
    }
  }, [search, hide_search_list]);

  return data.length ? (
    <div
      className=" position-absolute py-2 w-100 rounded-2"
      style={{
        zIndex: 2,
        background: `${theme.dark_lt}99`,
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        className="rounded-3"
        style={{
          height: "100%",
          maxHeight: 300,
          overflowY: "scroll",
        }}
      >
        {data.map((item) => (
          <Nav.Link
            className="search-nav-item"
            as={StyledNavLink}
            to={`/${item.MovieID ? "movies" : "tv-series"}/${
              item.MovieID || item.TVID
            }`}
            key={item.MovieID || item.TVID}
            onClick={handle_hide_search_list}
          >
            <Row>
              <Col xs={2} className="center px-1">
                <Image
                  poster
                  src={getServerImgPath(
                    item.MovieID || item.TVID,
                    item.poster || item.TVposter,
                    item.MovieID ? "movie" : "tv",
                    "poster"
                  )}
                  alt=""
                  className="w-100"
                />
              </Col>
              <Col xs={10} className="px-1">
                <P className="mb-0 line-1">{item.MovieTitle || item.TVtitle}</P>
                <Tags>
                  <Tag>
                    <P className="mb-0">{item.MovieYear || item.TVrelease}</P>
                  </Tag>
                  <Tag>
                    <P className="mb-0">
                      {item.MovieCagetory || item.TVcategory}
                    </P>
                  </Tag>
                </Tags>
              </Col>
            </Row>
          </Nav.Link>
        ))}
      </div>
    </div>
  ) : null;
}

function Search({ smallDevice }) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [hide_search_list, setHideSearchList] = useState(false);
  const toggler = () => setShow((state) => !state);
  const navigate = useNavigate();
  const handle_hide_search_list = () => setHideSearchList(true);
  const handle_search = (e) => {
    setSearch(e.target.value);
    setHideSearchList(!e.target.value);
  };
  const handle_show_search_list = () => setHideSearchList(false);
  const handle_submit = (e) => {
    e.preventDefault();
    setHideSearchList(true);
    setSearch("");
    navigate(`/search?search=${search}`);
  };

  return !smallDevice ? (
    <form style={{}} className="position-relative" onSubmit={handle_submit}>
      <SearchBox
        htmlFor="search"
        className="search d-flex justify-content-center align-items-center gap-2 px-3 py-1"
      >
        <input
          type="search"
          placeholder="Search"
          id="search"
          value={search}
          onChange={handle_search}
          onFocus={handle_show_search_list}
          autoComplete="off"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </SearchBox>
      <SearchData
        handle_hide_search_list={handle_hide_search_list}
        hide_search_list={hide_search_list}
        search={search}
      />
    </form>
  ) : (
    <>
      <A className="p-2" onClick={toggler}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </A>
      {show && (
        <div
          className="bg-light p-2 shadow"
          style={{
            position: "absolute",
            top: "80%",
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        >
          <form className="position-relative" onSubmit={handle_submit}>
            <SearchBox
              htmlFor="search"
              className="search d-flex justify-content-center align-items-center gap-2 px-3 py-1"
            >
              <input
                type="search"
                placeholder="Search"
                id="search"
                className="flex-grow-1"
                value={search}
                onChange={handle_search}
                onFocus={handle_show_search_list}
                autoComplete="off"
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </SearchBox>
            <SearchData
              handle_hide_search_list={handle_hide_search_list}
              hide_search_list={hide_search_list}
              search={search}
            />
          </form>
        </div>
      )}
    </>
  );
}

function Dropdown({
  drop_menu_item = [],
  outer,
  title = "",
  route = "/",
  param_prop = "category",
  disable_ative_style = false,
}) {
  return (
    <li className={`m-0 drop-menu`}>
      {outer ? (
        <A
          color="#bbb"
          className="w-100 d-flex justify-content-between p-2 align-items-start gap-2"
          disable
          dangerouslySetInnerHTML={{
            __html: `${title} <i class="fa-solid fa-sort-down"></i>`,
          }}
        ></A>
      ) : (
        <A
          color="#bbb"
          className="w-100 d-flex justify-content-between p-2 align-items-start gap-2"
          as={disable_ative_style ? NavLink : StyledNavLink}
          to={route}
        >
          {title} <i className="fa-solid fa-sort-down"></i>
        </A>
      )}
      <If isTrue={drop_menu_item.length}>
        <DropMenu
          className={` p-2 d-flex flex-column rounded-3 position-absolute drop-dwon-menu`}
          style={{ zIndex: 1000 }}
        >
          {drop_menu_item.map((item, index) =>
            outer ? (
              <A className="p-2" href={item.url} key={index} target="_blink">
                {item.name}
              </A>
            ) : (
              <A
                className="p-2"
                as={NavLink}
                to={item?.route || `${route}?${param_prop}=${item.name}`}
                key={item.id}
              >
                {item.name}
              </A>
            )
          )}
        </DropMenu>
      </If>
    </li>
  );
}

const Navbar = () => {
  const { site } = useSelector((store) => store.site);
  const location = useLocation();
  const smallDevice = useMediaQuery("(max-width: 860px)");
  const [show, setShow] = useState(false);
  const { movies, tv_series, const_menu } = useSelector((store) => store.menu);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    handleClose();
  },[location?.search,location?.pathname])
  //DISABLE IN PLAYER PAGE
  const onPlayPath = (location?.pathname?.split("/") || []).findIndex(
    (ele) => ele === "play"
  );
  if (onPlayPath >= 0) {
    return null;
  }

  return (
    <>
      <Header className="py-3 position-sticky top-0 shadow-lg">
        <Container
          fluid
          className="px-2 px-md-3 px-lg-5 d-flex gap-1 justify-content-between align-items-center"
        >
          <div>
            {smallDevice && (
              <Button className="d-inline py-1 px-2 me-2" onClick={handleShow}>
                <i className="fa-solid fa-bars"></i>
              </Button>
            )}
            <NavLink to="/">
              <Logo
                src={site?.logo || LOGO_PATH}
                style={{
                  width: "100%",
                  maxWidth: site?.logo_width || LOGO_WIDTH.value,
                }}
              />
            </NavLink>
          </div>
          <If isTrue={!smallDevice}>
            <Nav as={NavMenu} className="me-auto my-2 my-lg-0 gap-3 nav-menu">
              {smallDevice && (
                <Button className="d-inline">
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              )}
              {/* <li>
            <A href="#action1">Home</A>
          </li> */}
              <li>
                <StyledNavLink
                  color={"#bbb"}
                  href="#action1"
                  to="/"
                  hide_on_active
                >
                  Home
                </StyledNavLink>
              </li>
              <Dropdown
                smallDevice={smallDevice}
                route="/movies"
                param_prop={"category"}
                drop_menu_item={movies.category}
                title="Movies"
              />
              <Dropdown
                smallDevice={smallDevice}
                route="/tv-series"
                param_prop={"category"}
                drop_menu_item={tv_series.category}
                title="TV Series"
              />
              <Dropdown
                smallDevice={smallDevice}
                route="/movies"
                disable_ative_style
                param_prop={"genre"}
                drop_menu_item={[...movies.genre]}
                title="Genre"
              />
              {const_menu?.map((item) => (
                <>
                  <Show>
                    <Show.When isTrue={!!(item?.url || item?.route)}>
                      <li>
                        <A
                          href={item.url}
                          target={item.url ? "_blank" : ""}
                          as={item?.route ? NavLink : ""}
                          {...(item.route
                            ? { to: item?.route }
                            : { href: item.url })}
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        ></A>
                      </li>
                    </Show.When>
                    <Show.When
                      isTrue={!!item?.drop_menu && !!item?.drop_menu?.length}
                    >
                      <Dropdown
                        outer={item.outer}
                        drop_menu_item={item.drop_menu}
                        title={item.name}
                      />
                    </Show.When>
                  </Show>
                </>
              ))}
            </Nav>
          </If>
          <Search smallDevice={smallDevice} />
        </Container>
      </Header>
      <If isTrue={smallDevice}>
        <BSNavbar className="d-none">
          <Container fluid>
            <BSNavbar.Offcanvas
              show={show}
              onHide={handleClose}
              placement="start"
            >
              <Offcanvas.Header
                closeButton
                closeVariant="white"
                className="bg-dark"
              >
                <Offcanvas.Title>
                  <Image
                    src={site?.logo || LOGO_PATH}
                    alt=""
                    style={{
                      maxWidth: site?.logo_width || LOGO_WIDTH.value,
                      width: "100%",
                    }}
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="bg-dark">
                <Nav className="justify-content-start flex-grow-1  pe-3">
                  <Nav.Link as={StyledNavLink} to="/">
                    Home
                  </Nav.Link>
                  {!!movies?.category?.length && (
                    <NavDropdown title="Movies"  color={theme.primary}>
                      {movies?.category?.map((item) => (
                        <NavDropdown.Item
                          as={NavLink}
                          to={`/movies?category=${item.name}`}
                        >
                          {item.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                  {!!tv_series?.category?.length && (
                    <NavDropdown title="TV Series" color={theme.primary}>
                      {tv_series?.category?.map((item) => (
                        <NavDropdown.Item
                          as={NavLink}
                          to={`/tv-series?category=${item.name}`}
                        >
                          {item.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                  {!!movies?.genre?.length && (
                    <NavDropdown title="Genre" color={theme.primary}>
                      {movies?.genre?.map((item) => (
                        <NavDropdown.Item
                          as={NavLink}
                          to={`/movies?genre=${item.name}`}
                        >
                          {item.name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                  {const_menu?.map((item) => (
                    <>
                      <Show>
                        <Show.When isTrue={!!(item?.url || item?.route)}>
                          <li>
                            <A
                              className="nav-link"
                              target="_blank"
                              as={item?.route && NavLink}
                              dangerouslySetInnerHTML={{ __html: item?.name }}
                              {...(item?.route
                                ? {
                                    to: item.route,
                                  }
                                : {})}
                              {...(item?.url ? { href: item.url } : {})}
                            ></A>
                          </li>
                        </Show.When>
                        <Show.When
                          isTrue={
                            !!item?.drop_menu && !!item?.drop_menu?.length
                          }
                        >
                          <NavDropdown title={<div dangerouslySetInnerHTML={{__html:item?.name}}></div>} color={theme.primary}>
                            {item?.drop_menu?.map((item) => (
                              <NavDropdown.Item
                                href={item?.url}
                                to={item?.route}
                                as={item?.route && NavLink}
                                target={"_blink"}
                              >
                                {item.name}
                              </NavDropdown.Item>
                            ))}
                          </NavDropdown>
                        </Show.When>
                      </Show>
                    </>
                  ))}
                </Nav>
              </Offcanvas.Body>
            </BSNavbar.Offcanvas>
          </Container>
        </BSNavbar>
      </If>
    </>
  );
};

export default Navbar;
