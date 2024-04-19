"use client"
import React, { useState, useEffect } from 'react';
import { Flex, Box, Select, Grid, GridItem, Text, Tag, Badge, Button, Icon, Card, CardHeader, CardBody, Divider, CardFooter, Spacer, Progress, Heading } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai'; // Import clock icon
import axios from 'axios';

import Image from 'next/image';
import logo from '../../public/logo.png'
import late from '../../public/late.png'
import early from '../../public/early.png'

import './app.css'

const Page = () => {
  const baseURL = 'http://192.168.0.99:83/TaskPulseAPI/DeltaAPI'
  const [ids, setIds] = useState([]);
  const [cards, setCards] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [totalOptions, setTotalOptions] = useState([]);
  const [progress, setProgress] = useState(0); // Progress state
  const [time, setTime] = useState(0); // dynamic occurense time seting

  useEffect(() => {
    fetchOptions(); // 10 seconds
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    console.log("time", time);
    const intervalId = setInterval(() => {
      setSelectedOptionIndex((prevIndex) => (prevIndex + 1) % totalOptions.length);
      setProgress(0); // Reset progress when changing the dropdown
      // Start progressing with a 45 seconds interval
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + (100 / (time / 1000)));
      }, 2000)
      // Clear progress interval after 45 seconds
      setTimeout(() => {
        clearInterval(progressInterval);
      }, time == 0 ? 1000 : time);
    }, time == 0 ? 1000 : time);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [totalOptions, time]); // Run when totalOptions changes

  useEffect(() => {
    fetchCards()
  }, [selectedOptionIndex])

  const fetchOptions = async () => {
    try {
      setShow(true)
      const response = await axios.get(`${baseURL}/GetDivision`);
      setTotalOptions(response.data.map((item) => item.Text))
      setIds(response.data.map((item) => item.TextListId))

    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setShow(false)
    }
  };

  const fetchCards = async () => {
    try {
      if (typeof totalOptions[selectedOptionIndex] == 'undefined') return;
      console.log("selectedOptionIndex", selectedOptionIndex);
      const response = await axios.post(`${baseURL}/GetUserDetails?TextListId`, { textlistid: ids[selectedOptionIndex] });
      setCards(response.data)
      // console.log(response.data)
      setTime(response.data.length * 2 * 1000);


    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }

  function getColor(status, tasks, done, TaskNo) {
    // console.log("TaskNo",TaskNo);
    return status == 'Full Leave' ? 'gray' : status == "Half Leave-Second Half" ? 'grey' : status == "Half Leave-First Half" ? "grey" : status == "Visit" ? "teal" : TaskNo == null ? 'red.500' : (tasks == 0) ? 'orange.500' : 'green.500'
  }

  function mergeFirstLetters(name) {
    const parts = name.split(' ');
    let mergedLetters = '';
    parts.forEach(part => {
      const firstLetter = part.charAt(0).toUpperCase();
      mergedLetters += firstLetter;
    });
    return mergedLetters;
  }

  return (
    <Flex direction="column" bg="gray.50" minHeight="100vh" style={{ backgroundColor: "black" }}>
      {/* Header */}
      <Flex bg="gray.800" p="5" color="white" align="center">
        <Image src={logo} alt="Delta" width={70} height={50} />
        <Heading ml={'1%'} className='heartbeat'>Task Pulse</Heading>

      
        <Button ml={'30%'} colorScheme='white' variant='outline'>

          {totalOptions[selectedOptionIndex]}
        </Button>
     
        <Box ml="auto" display={'flex'} gap={'10px'}>
          {false && <Select
            color="white"
            hidden={true}
            value={totalOptions[selectedOptionIndex]}
            _readOnly={true}
            onChange={(e) => {
              const selectedIndex = totalOptions.indexOf(e.target.value);
              setSelectedOptionIndex(selectedIndex);
            }}
          >

            {totalOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>}

          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            
            <Button h={7} colorScheme='red'>Activity Pending
            </Button>
            <Button h={7} colorScheme='gray'>On Leave
            </Button>
            <Button h={7} colorScheme='orange'>Plan Pending
            </Button>
            <Button h={7} colorScheme='teal'>On Visit
            </Button>
          </Grid>


          {show && <Button isLoading={true}></Button>}
        </Box>
      </Flex>

      {/* Progress Bar */}
      {/* <Progress value={progress} colorScheme="blue" size="xs" transition="all 0.5s ease-in-out" /> */}


      {/* Main Content */}
      <Box flex="1" p="4">
        <Grid templateColumns="repeat(4, 1fr)" gap="4">
          {cards?.map((card, index) => (
            <GridItem key={index} colSpan={1}>
              <Card boxShadow="lg" bg="white" marginTop={'20px'} rounded="md">
                <CardHeader bg={getColor(card.Leave, card.NoOfTaskPlan, card.NoOfTaskPlanDone, card.TaskNo)} color="white" py="2" display={'flex'} justifyContent={'space-between'}>
                  <Badge variant="subtle" colorScheme={card.Status === 'Completed' ? 'green' : 'red'} h={'50%'}>
                    {card.Status}
                  </Badge>
                  <Flex justifyContent={'flex-start'} w={'100%'}>
                    <Text fontSize="lg" fontWeight="bold" mt="2" textAlign="center">{mergeFirstLetters(card.EmployeeName)}</Text>
                    <Text fontSize="lg" fontWeight="bold" mt="2" textAlign="center">#{card.TaskNo}</Text>
                  </Flex>

                  {card.Request == 'Late-In' && <Image src={late} style={{ borderRadius: "100%", marginRight: "10px" }} alt="Delta" width={40} height={28} />}
                  {card.Request == 'Early-Out' && <Image src={early} style={{ borderRadius: "100%", marginRight: "10px" }} alt="Delta" width={20} height={13} />}


                  <Flex flexDirection='column' gap={'7px'}>
                    <Text fontSize="md" fontWeight="bold" style={{ display: 'flex' }}><AiOutlineClockCircle style={{ marginRight: '5%' }} />{<Badge ml={'4%'} width={'100%'} textAlign={'center'}>{card.CheckInTime ? card.CheckInTime : '-'}</Badge>}</Text>
                    <Text fontSize="md" fontWeight="bold" style={{ display: 'flex' }}><AiOutlineClockCircle style={{ marginRight: "5%" }} />{<Badge ml={'4%'} width={'100%'} variant='solid' bg={card.CheckOutTime ? 'black' : getColor(card.Leave, card.NoOfTaskPlan, card.NoOfTaskPlanDone, card.TaskNo)}>{card.CheckOutTime ? card.CheckOutTime : '-'}</Badge>}</Text>
                  </Flex>
                </CardHeader>
                <CardBody bg={'#1B1B1E'} color={'white'}>
                  <Box>
                    <Text fontWeight={'bold'} textAlign={'center'} fontSize={'large'} width={'100%'} >{<span style={{ whiteSpace: 'nowrap' }}>{card.EmployeeName}</span>}</Text>
                    <br />
                    <Divider />
                    <Divider />
                    <Flex justifyContent={'space-between'} flexDir={'column'} marginTop={'20px'}>
                      <Text
                        fontSize="xl"
                        whiteSpace={'nowrap'}
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        color="#FCEC52"
                      >
                        {card.Department ? card.Department : '-'}
                      </Text>


                      <Text
                        fontSize="xl"
                        whiteSpace={'nowrap'}
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        color={'#14BDEB'}
                      >
                        {card.Project ? card.Project : '-'}
                      </Text>
                    </Flex>
                  </Box>
                </CardBody>
                <CardFooter bg={'gray.700'} color={'white'} height={'50px'} borderTop="1px solid" borderTopColor="gray.500">
                  <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <Flex alignItems="center" mr={2}>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: getColor(card.NoOfTaskPlan ? card.NoOfTaskPlan : 0, card.NoOfTaskPlanDone ? card.NoOfTaskPlanDone : 0),
                        }}
                      />
                      <Text fontSize={'x-large'} ml={2}>{card.NoOfTaskPlan ? card.NoOfTaskPlan : 0}/{card.NoOfTaskPlanDone ? card.NoOfTaskPlanDone : 0}</Text>
                    </Flex>
                  </Flex>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Page;