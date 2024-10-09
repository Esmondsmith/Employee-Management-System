-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 10:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeems`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin1@gmail.com', 'password1');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL DEFAULT 'Multi professional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(9, 'AWS Specialist'),
(14, 'IT Consult'),
(16, 'Scrum Master'),
(17, 'Web development'),
(18, 'Graphic Designer');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(128) NOT NULL,
  `image` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `password`, `salary`, `address`, `image`, `category_id`) VALUES
(9, 'John Greens', 'john@gmail.com', '$2b$10$UUmfhLKwgKjPJRncpDkIb.c5WlIdHghIiv1kqnpiERi4PzIqTN2..', 7000, 'john road, Lagos street', 'image_1728381165687.png', 14),
(10, 'Kelvin Bills', 'kelvin@gmail.com', '$2b$10$rEPOjqzFijKyXQeC9kzd0umlwo//o5Z6tjMkUtvYHyocHXWJvl53K', 6400, 'billss road, Idimu street, Lagos', 'image_1728386304620.png', 17),
(11, 'Rhoda Brown', 'rhoda@gmail.com', '$2b$10$GxJWpFh1Tw4AEx6AVLz4BupRHh7AmYhHJc3JRWm99Ii.d9GKSsd5i', 6200, '16, Ade Street, Gode Estate, Ikeja', 'image_1728386352173.png', 16);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `employee_id` int(11) NOT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `description`, `employee_id`, `date`, `status`) VALUES
(80, 'Lets meet for a meeting soon', 9, '2024-10-08 12:19:28', 'completed'),
(81, 'Also remember to get the customer number', 9, '2024-10-08 12:19:51', 'completed'),
(82, 'Work on your UI', 10, '2024-10-08 12:20:03', 'completed'),
(83, 'Fix a meeting by 9a.m for tomorrow', 11, '2024-10-08 12:20:22', 'completed'),
(84, 'Also fix another meeting by 4pm', 11, '2024-10-08 12:20:38', 'completed'),
(85, 'Meeting with CEO by 5pm', 9, '2024-10-08 12:20:54', 'pending'),
(86, 'Develop login for users table', 10, '2024-10-08 12:21:13', 'pending'),
(87, 'Fix a meeting with all frontend by 5pm', 11, '2024-10-08 12:27:46', 'completed'),
(88, 'Fix a meeting between testers and developers and notify both parties ', 11, '2024-10-08 12:28:14', 'pending'),
(89, 'Meet with all our clients tomorrow', 9, '2024-10-08 17:03:42', 'pending'),
(90, 'complete your UI.', 10, '2024-10-09 14:32:06', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
