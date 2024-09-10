import React, {useState} from 'react';
import {Button, Flex, Select} from "figma-kit"
import randomUsers from "../data/randomusers.json";
import accoTypes from "../data/accommodation-types.json";

function DataSets() {

    const dataSets = [{
        name: "Users",
        data: randomUsers.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            login: user.login.username,
            phone: `${user.phone}`,
            age: `${user.dob.age}`,
            dateOfBirth: new Date(user.dob.date).toLocaleDateString('EN')
        })),
        fields: [ 'name', 'email', 'login', 'phone', 'age', 'dateOfBirth' ],
    },
    {
        name: "Accommodation types",
        data: accoTypes.map(type => ({
            accommodationKind: type.accommodationKindName,
            code: type.code,
            name: type.name,
            namePath: type.namePath,
            location: type.resortName,

        })),
        fields: [ 'name', 'code', 'namePath', 'accommodationKind', 'location', ],
    }];
    const [activeDataSet, setActiveDataSet] = useState('Users');


    const insertTexts = (field:string) => {
        const set = dataSets.find(set => set.name == activeDataSet);
        if(set){
            parent.postMessage({pluginMessage: {type: 'insert-texts', texts: set.data.map(item => item[field])}}, '*');
        }
    };

    const dataSetOptions = () => {
        return dataSets.map(set => (
            <Select.Item key={set.name} value={set.name}>{set.name}</Select.Item>
        ))
    }

    const dataSetFields = () => {
        const set = dataSets.find(set => set.name == activeDataSet);
        console.log(set);
        if (set) {

            return set.fields.map(field =>
                <Button style={{width: '100%'}} key={field} onClick={() => insertTexts(field)} className="icon__button" variant="text">
                    {field}
                </Button>
            );
        }
        return "";
    }


    return (
        <Flex direction="column" align="start" justify="start" gap="2">
            <Select.Root onValueChange={setActiveDataSet} value={activeDataSet}>
                <Select.Trigger />
                <Select.Content>
                    {dataSetOptions()}
                </Select.Content>
            </Select.Root>
            <Flex style={{width: '100%'}} direction="column" align="start" justify="start" gap="2">
                {dataSetFields()}
            </Flex>
        </Flex>

    );
}

export default DataSets;
