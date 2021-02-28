import { Image, List, Placeholder } from 'semantic-ui-react'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {BASE_URL} from "../../config/baseUrl";


export default RenderStudentSummary = () => {
    
      const RenderPrayerSummary = ({prayer_logs}) => {
        const prayer_hours_sum = prayer_logs.reduce((prev, cur) => prev + cur.number_of_hours, 0);
  
        return (
        <List.Item>
          <List.Content floated='right'>
            {prayer_hours_sum}
          </List.Content>
          <Image avatar src='http://www.clker.com/cliparts/L/A/1/9/z/W/praying-hands-rt.svg' />
          <List.Content>
            <List.Header>Prayer (Number of Hours): </List.Header>
          </List.Content>
        </List.Item>
        );
  
      }
  
      const RenderVisitationSummary = ({visitation_logs}) => {
        const visitations = visitation_logs.length;
        return (
          <List.Item>
            <List.Content floated='right'>
              {visitations}
            </List.Content>
            <Image avatar src='https://image.flaticon.com/icons/png/512/10/10694.png' />
            <List.Content>
              <List.Header>Number of Visitations: </List.Header>
            </List.Content>
          </List.Item>
          );
      }
  
      const RenderCounsellingSummary = ({counselling_logs}) => {
        const counsellings = counselling_logs.length;
        return (
          <List.Item>
            <List.Content floated='right'>
              {counsellings}
            </List.Content>
            <Image avatar src='https://listimg.pinclipart.com/picdir/s/35-357266_benefit-counseling-pierce-benefits-interview-icon-png-clipart.png' />
            <List.Content>
              <List.Header>Number of Counsellings: </List.Header>
            </List.Content>
          </List.Item>
          );
      }
  
      const RenderOutreachSummary = ({outreach_logs}) => {
        const outreaches = outreach_logs.length;
        return (
          <List.Item>
            <List.Content floated='right'>
              {outreaches}
            </List.Content>
            <Image avatar src='https://static.thenounproject.com/png/1151430-200.png' />
            <List.Content>
              <List.Header>Souls Won: </List.Header>
            </List.Content>
          </List.Item>
          );
      }
  
      const RenderBussingSummary = ({bussing_logs}) => {
        const bussing_average = (bussing_logs.reduce((prev, cur) => prev + cur.value, 0) / bussing_logs.length).toFixed(2);
        return (
          <List.Item>
            <List.Content floated='right'>
              {bussing_average}
            </List.Content>
            <Image avatar src='https://simg.nicepng.com/png/small/51-517562_image-set-png-128x128-px-shuttle-bus-icon.png' />
            <List.Content>
              <List.Header>Bussing Average: </List.Header>
            </List.Content>
          </List.Item>
          );
      }
  
      const RenderCenterServiceSummary = ({center_services}) => {
        const center_service_average = (center_services.reduce((prev, cur) => prev + cur.number_of_souls, 0) / center_services.length).toFixed(2);
        return (
          <List.Item>
            <List.Content floated='right'>
              {center_service_average}
            </List.Content>
            <Image avatar src='https://cdn.iconscout.com/icon/premium/png-128-thumb/church-339-556352.png' />
            <List.Content>
              <List.Header>Center Service Average: </List.Header>
            </List.Content>
          </List.Item>
        );
      }


    return (
      (typeof studentProfileInformation.student_profile !== 'undefined') ?
      <List divided verticalAlign='middle'>  
          <RenderPrayerSummary prayer_logs={studentProfileInformation.student_profile?.prayer_logs}/>
          <RenderVisitationSummary visitation_logs={studentProfileInformation.student_profile?.sheep_seeking}/>
          <RenderCounsellingSummary counselling_logs={studentProfileInformation.student_profile?.counsellings}/>
          <RenderOutreachSummary outreach_logs={studentProfileInformation.student_profile?.outreach}/>
          <RenderBussingSummary bussing_logs={studentProfileInformation?.student_bussing_history}/>
          <RenderCenterServiceSummary center_services={studentProfileInformation.student_profile?.student_center_service} />
      </List>
      :
      <div className="ui placeholder">
        <div className="image header">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="image header">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="image header">
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="image header">
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div> 
      
    );
  }