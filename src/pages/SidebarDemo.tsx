import React from "react";
import SidebarMenu, { SidebarMenuItem } from "../components/Layout/Navigation/SidebarMenu/SidebarMenu";
import SidebarContentPanel from "../components/Layout/Sidebar/SidebarContentPanel/SidebarContentPanel";

export const SidebarDemo = () => {

    const typoItems: SidebarMenuItem[] = [
        { title: 'Typography', url: '/demo/typography' },
    ];

    const formItems: SidebarMenuItem[] = [
        { title: 'Checkbox', url: '/demo/checkbox' },
        { title: 'DateInput', url: '/demo/dateinput' },
        { title: 'DatePicker', url: '/demo/datepicker' },
        { title: 'Dropdown', url: '/demo/dropdown' },
        { title: 'Input', url: '/demo/input' },
        { title: 'Password Input', url: '/demo/inputpassword' },
        { title: 'Search Input', url: '/demo/inputsearch' },
        { title: 'Multiselect', url: '/demo/multiselect' },
        { title: 'FileSelect', url: '/demo/fileselect' },
        { title: 'Radiobutton', url: '/demo/radiobutton' },
        { title: 'TagsInput', url: '/demo/tagsinput' },
        { title: 'Toggleswitch', url: '/demo/toggleswitch' },
    ];

    const uiItems: SidebarMenuItem[] = [
       
        { title: 'Button', url: '/demo/button' },
        { title: 'Dismiss button', url: '/demo/dismiss' },
        { title: 'Dropdown', url: '/demo/dropdown' },

        { title: 'Icons', url: '/demo/icons' },
        { title: 'Ripple effect', url: '/demo/ripple' },
    ];


    return (
        <>
            

            <SidebarContentPanel>
                <h4>Form elements</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={formItems} />

            <SidebarContentPanel>
                <h4>UI elements</h4>
            </SidebarContentPanel>
            <SidebarMenu menuItems={uiItems} />


            {/* <SidebarContentPanel>
                <h4>Typography</h4>
            </SidebarContentPanel>            
            <SidebarMenu menuItems={typoItems} /> */}

        </>
    )
}

export default SidebarDemo;