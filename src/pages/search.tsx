import { Button } from "@mantine/core";
import { SpotlightProvider, openSpotlight, useSpotlight, SpotlightAction } from "@mantine/spotlight";
import { useState } from "react";
import { Building, Dashboard, File, Home, Search, Train } from "tabler-icons-react";

export default function SearchPage() {


    const actions: SpotlightAction[] = [
        {
        title: '350101',
        group: 'rolling stock',
        description: '54566 6644 45666 45664 46544',
        onTrigger: () => console.log('Home')
        },
        {
          title: 'Class 350',
          group: 'Class',
          description: '87 units, London Northwestern Railway',
          onTrigger: () => console.log('Home')
        },
        {
          title: 'Class 139',
          group: 'Class',
          description: '2 units, West Midlands Railway',
          onTrigger: () => console.log('Home')
        },
        {
          title: 'London Northwestern Railway',
          description: '123 units, London & Midlands',
          group: 'operator',
          onTrigger: () => console.log('Dashboard'),
          icon: <Building size={18} />,
        }
      
      ];

    return(
        <SpotlightProvider
      actions={actions}
      searchIcon={<Search size={18} />}
      searchPlaceholder="Search..."
      shortcut="mod + shift + C"
    >
            <Spot></Spot>
        </SpotlightProvider>
    )
}

function Spot() {
    const [registered, setRegistered] = useState(false);
    const spotlight = useSpotlight();
    return (
        <Button onClick={() => openSpotlight()}></Button>
    )
}