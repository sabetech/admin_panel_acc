import React from 'react';

import { Card, Icon, Image } from 'semantic-ui-react'


export const StudentCard = ({student}) => (
  
  
    <Card style={{marginTop: 20}}>
      <Image src={`http://anagkazo.firstlovegallery.com/${student.photo_url}`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{student.name}</Card.Header>
        <Card.Meta>
          <span className='date'>{student.class}</span>
        </Card.Meta>
        <Card.Description>
          {student.country}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        
      </Card.Content>
  </Card>


)
export default StudentCard;