import React, {useState, useEffect} from "react";
import {
    Label
  } from "reactstrap";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";
import { Dropdown } from 'semantic-ui-react';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";



export default function StudentFilterBox({all_students, setFilteredStudents, setCurrentHeading, filterParams}){
  
  const filterOptions = [
        {
            key: 'name',
            text: 'Name',
            value: 'name'
          },
          {
            key: 'class',
            text: 'Class',
            value: 'class'
          },
          {
            key: 'country',
            text: 'Country',
            value: 'country'
          },
          {
            key: 'ud_non_ud',
            text: 'UD/NON-UD',
            value: 'ud_non_ud'
          },
          {
            key: 'constituency',
            text: 'Constituency',
            value: 'constituency'
          },
          {
            key: 'center',
            text: 'Center',
            value: 'center'
          },
          {
            key: 'role',
            text: 'Role',
            value: 'role'
          }
    ];
    const [filterOption, setFilterOption] = useState("");
    const [selectedFilterValue, setSelectedFilterValue] = useState("");
    const [filterText, setFilterText] = useState("");
    const [currentPlaceholder, setPlaceholder] = useState("");
    
    const [filterValues, setFilterValues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      
      if (filterParams != null){
        setFilterOption(filterParams.filter_option);
        loadRoles();
        setCurrentHeading("Students Filtering: "+ (filterParams?.filter_option?.toUpperCase()||"None")); 
        setPlaceholder("Filter By Student Roles");
      }
      
    },[filterParams]);

    const filterValueCallbackFn = () => {
      if (filterParams != null){
          console.log(filterParams.filter_value);
          setSelectedFilterValue(filterParams.filter_value);
          loadFilteredStudents({value: filterParams.filter_value});
      }
    }

    const selectFilterOption = (selectedOption) => {
        
        setFilterOption(selectedOption.value);
        setCurrentHeading("Students Filtering By "+selectedOption.value.toUpperCase());

        switch(selectedOption.value){
        case 'name':  
            setPlaceholder("Search for Name");
            setFilterValues([
                    {key: 0, value: 'all', text: 'All'}, 
                    ...all_students.map((student) => {
                        return {
                                key: student.id, 
                                value: student.index_number, 
                                text: student.name
                            }
                        })
                ]);
        break;
    
        case 'class':
            setPlaceholder("Search for Class");
            let myClasses = all_students.map(student => student.class)
                            .filter((value, index, self) => self.indexOf(value) === index);
            
            setFilterValues([
                {key: 0, value: 'all', text: 'All Classes'},
                ...myClasses.map((item, index) => {
                    return {
                        key: (index + 1),
                        value: item,
                        text: item
                    }
                })
            ]);

        
        break;
    
        case 'country':
          setPlaceholder("Search for Country");
          let myCountry = all_students.map(student => student.country)
          .filter((value, index, self) => self.indexOf(value) === index);

          setFilterValues([
            {key: 0, value: 'all', text: 'All Country'},
            ...myCountry.map((item, index) => {
              return {
                  key: (index + 1),
                  value: item,
                  text: item
              }
            })
          ]);
        break;
    
        case 'ud_non_ud':
          setPlaceholder("Filter By UD or Non UD");
          setFilterValues([{
            key: 1,
            value: 'all',
            text: 'All'
          },
          {
            key: 2,
            value: 'Not Set',
            text: 'Not Set'
          },{
            key: 3,
            value: 'ud',
            text: 'UD'
          }, 
          {
            key: 4,
            value: 'non_ud',
            text: 'NON-UD'
          },
          {
            key: 5,
            value: 'firstlove',
            text: 'Firstlove'
          }]);
        break;
      
        case 'constituency':
        
          setPlaceholder("Search for Constituency");
          loadCommunities();
        
        break;
    
        case 'center':
          setPlaceholder("Filter By Center");
          loadCenters();
        break;
    
        case 'role':
          setPlaceholder("Filter By Student Roles");
          loadRoles()  ;
        break;
      }
    }

      const loadCommunities = () => {
        setLoading(true);
        return axios.get(`${BASE_URL}/admin_app/communities`)
                    .then((response) => 
                    {
                      setFilterValues([{key: 0, value: 'all', text: 'All Constituency'},
                        ...response.data.map((community) => {
                          return {
                            key: community.id,
                            value: community.id,
                            text: community.region_name
                          }
                      } 
                  )]
                );
                setLoading(false);
              });
    }

    const loadCenters = () => {
      setLoading(true);
      return axios.get(`${BASE_URL}/admin_app/centers`)
                    .then((response) => 
                    {
                      setFilterValues([{key: 0, value: 'all', text: 'All Centers'},
                      ...response.data.map((center) => {
                          return {
                            key: center.id,
                            value: center.center_name,
                            text: center.center_name
                          }
                      })]);
                      setLoading(false);
                    });
      
    }

    const loadRoles = () => {
      setLoading(true);
      return axios.get(`${BASE_URL}/react_admin/admin_app/pastoral_roles`)
                .then((response) => {
                  setFilterValues([{key: 0, value: 'all', text: 'All Roles'},
                  ...response.data.map((role) => {
                    return {
                      key: role.id,
                      value: role.id,
                      text: role.role
                    }
                })]);
                setLoading(false);
                filterValueCallbackFn()
                })
    }

      const loadFilteredStudents = (filterValue) => {
        
        setFilterText(filterValue.text);
        setSelectedFilterValue(filterValue.value);

        switch(filterOption){
    
          case 'name':
            if (filterValue.value === 'all'){
                setFilteredStudents(all_students);
            }else{
                setFilteredStudents(all_students.filter((student) => student.index_number.toString().includes(filterValue.value)));
            }
          break;
    
        case 'class':
          
          if (filterValue === 'all'){
              setFilteredStudents(all_students);
            }else{
              setFilteredStudents(all_students.filter((student) => student.class.includes(filterValue.value)));
          }
        break;
    
        case 'country':
          if (filterValue === 'all'){
              setFilteredStudents(all_students);
          }else{
              setFilteredStudents(all_students.filter((student) => student.country.includes(filterValue.value)));
        } 
        break;

        case 'ud_non_ud':
          if (filterValue === 'all'){
            setFilteredStudents(all_students);
          }else{
            setFilteredStudents(all_students.filter((student) => student.denomination.includes(filterValue.value)));
          }
        break;
        
        case 'constituency':
          if (filterValue === 'all'){
            setFilteredStudents(all_students);
          }else{
            setFilteredStudents(all_students.filter((student) => student?.center?.region_id.toString().includes(filterValue.value)));
          }
        break;

        case 'center':
          if (filterValue === 'all'){
            setFilteredStudents(all_students);
          }else{
            setFilteredStudents(all_students.filter((student) => student?.center?.center_name.toString().includes(filterValue.value)));
          }
        break;

        case 'role':
          if (filterValue === 'all'){
            setFilteredStudents(all_students);
          }else{
            setFilteredStudents(all_students.filter((student) => student?.student_roles?.some(el => el.role_id == filterValue.value)));
          }
          break;
      }  
    }
  
    return (
        <div className="row">
            <div className="col">
                <Label >Filter Options</Label>
                <Dropdown 
                    placeholder='Select Filter Option'
                    fluid
                    selection
                    options={filterOptions}
                    value={filterOption}
                    onChange={(e, x) => selectFilterOption(x)}
                />
                
            </div>
            <div className="col">
                <Label >Filter Values</Label>
                <Dropdown
                    placeholder={currentPlaceholder}
                    fluid
                    search
                    value={selectedFilterValue}
                    selection
                    onChange={(e, x) => loadFilteredStudents(x)}
                    options={filterValues}
                    disabled={(filterOption === "")}
                    loading={loading}
                />
            </div>
        </div>

    )

}