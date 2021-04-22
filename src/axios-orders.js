// import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-cd0c9-default-rtdb.firebaseio.com/',
});

export default instance;