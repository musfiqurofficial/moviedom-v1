import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Devider,
  SliderSection,
  SliderSectionHeader,
  TabName,
} from "../../../style/common/Slider";
import { If, For, Show } from "react-haiku";
import { H4 } from "../../../style/typography/typography";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SideTitledSlider from "./SideTitledSlider";
import MovieDom from "../../../Api/MovieDom";

function SingleSlider({
  title,
  devider,
  sideTitle,
  type,
  dark,
  route,
  filter,
  righted,
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    switch (type) {
      case "movie":
        MovieDom.getMovies({ ...filter, limit: 15 })
          .then((dt) => {
            setData(dt);
          })
          .catch(() => {
            setData([]);
          });
        break;
      case "tv-series":
        MovieDom.getTVShows({ ...filter, limit: 15 })
          .then((dt) => {
            setData(dt);
          })
          .catch(() => {
            setData([]);
          });
        break;
      default:
        console.warn("`type` is required.");
        break;
    }
  }, [filter, type]);

  // return(
  //   <H1>
  //     {title} : {data.length}
  //   </H1>
  // )
if(!data.length ) return null;
  return (
    <SliderSection dark={dark} className="py-3">
      <SliderSectionHeader
        className="py-2"
        as={Container}
        fluid
        jc="flex-start"
      >
        <If isTrue={!!title}>
          <H4>{title}</H4>
        </If>
        <If isTrue={!!devider}>
          <Devider />
        </If>
      </SliderSectionHeader>
      <div className="pb-3">
        <SideTitledSlider
          title={sideTitle}
          type={type}
          route={route}
          filter={filter}
          date={data}
          righted={righted}
        />
      </div>
    </SliderSection>
  );
}

const Slider = (props) => {
  const [active_tab, setActiveTab] = useState(0);
  const {
    righted,
    title,
    route = "/",
    dark = false,
    type = "movie",
    devider = false,
    tabs = [],
    episodes = [],
  } = props;
  return (
    <Show>
      {/* EPISODE SLIDER */}
      <Show.When isTrue={!!episodes.length}>
        <SliderSectionHeader dark={dark}>
          <H4>{title}</H4>
          <Devider />
          <SideTitledSlider
            route={route}
            title={title}
            type={type}
            data={episodes}
            righted={righted}
          />
        </SliderSectionHeader>
      </Show.When>

      {/* FOR Tab Slider */}
      <Show.When isTrue={!!tabs.length}>
        <SliderSection dark={dark} className="py-3">
          <Tabs selectedIndex={active_tab}>
            <SliderSectionHeader
              as={Container}
              fluid
              jc="flex-start"
              className="py-2"
            >
              <If isTrue={!!title}>
                <H4>{title}</H4>
              </If>
              <If isTrue={!!devider}>
                <Devider />
              </If>
              <If isTrue={!!tabs.length}>
                <TabList>
                  <For
                    each={tabs}
                    render={(item, index) => (
                      <Tab
                        onClick={() => setActiveTab(index)}
                        className={`react-tabs__tab ${
                          index === active_tab && "react-tabs__tab--selected"
                        }`}
                      >
                        <TabName>
                          <small className="text">{item.title}</small>
                        </TabName>
                      </Tab>
                    )}
                  />
                </TabList>
              </If>
            </SliderSectionHeader>

            <Show>
              <Show.When isTrue={!!tabs.length}>
                {tabs.map((item) => (
                  <TabPanel>
                    <SideTitledSlider
                      route={route}
                      title={`${item.title} ${
                        type === "movie" ? "Movies" : "TV Series"
                      }`}
                      type={type}
                      filter={item.filter}
                      righted={righted}
                    />
                  </TabPanel>
                ))}
              </Show.When>
              <Show.Else>{null}</Show.Else>
            </Show>
          </Tabs>
        </SliderSection>
      </Show.When>

      {/* MOVIE SLIDER */}
      <Show.Else>
        <SingleSlider {...props} />
      </Show.Else>
    </Show>
  );
};

export default Slider;
