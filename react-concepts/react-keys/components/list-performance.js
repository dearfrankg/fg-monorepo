import { Fragment, useEffect, useState } from "react";
import { Radio, Checkbox, Space, Alert } from "antd";
import { formatDistance } from "date-fns";

const styles = {
  flex: { display: "flex" },
  flexItem: (ratio) => ({ flex: ratio }),
};

const initState = [
  { id: 1, createdAt: "", name: "frank", age: 23 },
  { id: 2, createdAt: "", name: "joe", age: 45 },
  { id: 3, createdAt: "", name: "steve", age: 33 },
  { id: 4, createdAt: "", name: "larry", age: 33 },
  { id: 5, createdAt: "", name: "steph", age: 44 },
  { id: 6, createdAt: "", name: "steph", age: 25 },
  { id: 7, createdAt: "", name: "draymond", age: 28 },
  { id: 8, createdAt: "", name: "klay", age: 33 },
];

const options = {
  sort: [
    { label: "Create Time", value: "byCreate" },
    { label: "Name", value: "byName" },
    { label: "Age", value: "byAge" },
    { label: "Name and Age", value: "byNameAndAge" },
  ],

  edit: [
    { label: "Remove first", value: "removeFirst" },
    { label: "Remove last", value: "removeLast" },
    { label: "Edit property", value: "editProperty" },
    { label: "Restore list", value: "restoreList" },
  ],

  show: ["byIndex", "byId"],

  person: { id: 0, createdAt: "Created At", name: "Name", age: "Age" },
};

const components = {
  Person: ({ person, styles }) => {
    useEffect(() => {
      console.log(`mounted ${person.id}`);
      return () => {
        console.log(`unmounted ${person.id}`);
      };
    }, [person]);

    const calcDate = () => {
      if (typeof person.createdAt === "string") {
        return person.createdAt;
      }

      return formatDistance(new Date(person.createdAt), new Date(), { addSuffix: true });
    };

    return (
      <div style={{ display: "flex", width: 500, ...styles }}>
        <div style={{ flex: 1 }}>{calcDate()}</div>
        <div style={{ flex: 1 }}>{person.name}</div>
        <div style={{ flex: 1 }}> {person.age}</div>
      </div>
    );
  },

  ItemsUsingIndex: ({ people, sortBy, handle, Person, show }) => {
    if (!show.includes("byIndex")) {
      return null;
    }

    const listItems = people.sort(handle[sortBy]).map((person, personIndex) => (
      <li key={personIndex + 1}>
        <Person person={person} />
      </li>
    ));

    listItems.unshift(
      <li key={0}>
        <Person styles={{ backgroundColor: "wheat" }} person={options.person} />
      </li>
    );

    return (
      <>
        <h2>Using index for key</h2>
        <ul style={{ listStyle: "none" }}>{listItems}</ul>
      </>
    );
  },

  ItemsUsingId: ({ people, sortBy, handle, Person, show }) => {
    if (!show.includes("byId")) {
      return null;
    }

    const listItems = people.sort(handle[sortBy]).map((person) => (
      <li key={person.id}>
        <Person person={person} />
      </li>
    ));

    listItems.unshift(
      <li key={0}>
        <Person styles={{ backgroundColor: "wheat" }} person={options.person} />
      </li>
    );

    return (
      <>
        <h2>Using row.id for key</h2>
        <ul style={{ listStyle: "none" }}>{listItems}</ul>
      </>
    );
  },
};

const { Person, ItemsUsingId, ItemsUsingIndex } = components;
const clone = (data) => JSON.parse(JSON.stringify(data));
export const ListPerformance = () => {
  const [people, setPeople] = useState([]);
  const [sortBy, setSortBy] = useState("byCreate");
  const [show, setShow] = useState(["byIndex", "byId"]);

  useEffect(() => {
    // dates should be handled in useEffect to keep server side in sync
    let timestamp = Date.now();
    initState.forEach((item) => {
      timestamp -= 20000000;
      item.createdAt = timestamp;
    });
    setPeople(clone(initState));
  }, []);

  const handle = {
    removeFirst: () => setPeople(people.slice(1)),
    removeLast: () => setPeople(people.slice(0, -1)),
    editProperty: () => {
      people.forEach((record) => {
        record.name = record.name[0] === "*" ? record.name.slice(1) : `*${record.name}`;
      });
      console.log("people: ", JSON.stringify(people));
      setPeople(people);
    },
    restoreList: () => setPeople(initState.slice(0)),
    setSort: ({ target: { value } }) => setSortBy(value),
    edit: ({ target: { value } }) => handle[value](value),
    byCreate: (a, b) => b.createdAt - a.createdAt,
    byName: (a, b) => a.name.localeCompare(b.name),
    byAge: (a, b) => a.age - b.age,
    byNameAndAge: (a, b) => a.name.localeCompare(b.name) || a.age - b.age,
    show: (e) => setShow(e),
  };

  return (
    <Fragment>
      <h1>Using React Keys For List Performance</h1>

      <div>
        <Alert
          type="info"
          showIcon
          message="Open the console to see perfomance info"
          style={{ margin: "20px 0 ", width: "100%" }}
        />
      </div>

      <Space direction="vertical" size="middle" style={{ width: 700 }}>
        <div style={styles.flex}>
          <div style={{ ...styles.flexItem(2) }}>
            <strong>Sort By: </strong>
          </div>

          <div style={{ ...styles.flexItem(8) }}>
            <Radio.Group
              options={options.sort}
              onChange={handle.setSort}
              value={sortBy}
              optionType={"button"}
            />
          </div>
        </div>

        <div style={styles.flex}>
          <div style={{ ...styles.flexItem(2) }}>
            <strong>Edit list: </strong>
          </div>

          <div style={{ ...styles.flexItem(8) }}>
            <Radio.Group
              options={options.edit}
              onChange={handle.edit}
              value=""
              optionType={"button"}
            />
          </div>
        </div>

        <div style={styles.flex}>
          <div style={{ ...styles.flexItem(2) }}>
            <strong>Show list: </strong>
          </div>

          <div style={{ ...styles.flexItem(8) }}>
            <Checkbox.Group
              options={options.show}
              onChange={handle.show}
              defaultValue={show}
              optionType={"button"}
            />
          </div>
        </div>

        <ItemsUsingIndex {...{ people, sortBy, handle, Person, show }} />

        <ItemsUsingId {...{ people, sortBy, handle, Person, show }} />
      </Space>
    </Fragment>
  );
};
