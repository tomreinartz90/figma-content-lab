import React from 'react';
import { useId, useState } from 'react';
import {Button, Flex, Input} from "figma-kit"
import icons from "../../data/material-icons.json";
import "./icons.css";
function Icons(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const insertText = (text) => {
        parent.postMessage({pluginMessage: {type: 'insert-text', text}}, '*');
    };

    // filter the icons on the basis of a search query.
    const iconData = (searchQuery) => icons
        .filter(icon => !icon.unsupported_families.some(un => un == "Material Icons"))
        .filter(icon => {
            if (searchQuery && searchQuery != "") {
                return icon.tags.some(tag => tag.startsWith(searchQuery.toLowerCase()))
            }
            return true;
        }).map(icon => {
            return (
                <Button key={icon.name} onClick={() => insertText(icon.name)} className="icon__button" variant="text">
                    <span className="material-symbols-outlined">{icon.name}</span>
                    <span className="icon__name">{icon.name}</span>
                </Button>
            );
        }).sort((a, b) => b.popularity - a.popularity)
        .slice(0, 100);

    return (
        <Flex direction="column" align="start" justify="start" gap="4">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"/>
            <Input onChange={evt => setSearchQuery(evt.target.value)}/>
            <Flex className="icon__list" direction="column" align="start" justify="start" gap="2">
                {iconData(searchQuery)}
            </Flex>
        </Flex>

    );
}

export default Icons;
