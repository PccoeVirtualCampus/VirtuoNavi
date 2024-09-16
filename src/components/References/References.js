
import React, { useState, useEffect } from 'react';
import './References.css'; // Import your CSS file
const References = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [yearOption, setYearOption] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  // Function to handle year options change
  const handleYearOptions = (event) => {
    const selectedOption = event.target.value;
    setYearOption(selectedOption);
    
    switch (selectedOption) {
      case 'sortAsc':
        sortTableByYear(true);  // Sort in ascending order
        break;
      case 'sortDesc':
        sortTableByYear(false); // Sort in descending order
        break;
      case 'filterRange':
        document.getElementById('yearRangeInputs').style.display = 'block'; // Show year range inputs for filtering
        break;
      case 'reset':
        resetTable(); // Reset table to initial condition (sorted by Paper no.)
        break;
      default:
        break;
    }
  };

  // Function to sort the table by year (ascending or descending)
  const sortTableByYear = (ascending) => {
    const table = document.querySelector('.table tbody');
    const rowsArray = Array.from(table.getElementsByTagName('tr'));

    // Sort rows based on the year (third column, index 2)
    rowsArray.sort((rowA, rowB) => {
      const yearA = parseInt(rowA.getElementsByTagName('td')[2].textContent);
      const yearB = parseInt(rowB.getElementsByTagName('td')[2].textContent);
      return ascending ? yearA - yearB : yearB - yearA;
    });

    // Re-insert rows in the sorted order
    rowsArray.forEach(row => table.appendChild(row));
  };

  // Function to filter the table by a year range
  const filterByYearRange = () => {
    const start = parseInt(startYear);
    const end = parseInt(endYear);

    const table = document.querySelector('.table tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const yearCell = rows[i].getElementsByTagName('td')[2];
      const yearValue = parseInt(yearCell.textContent);

      // Show row if year is within the specified range, hide it otherwise
      if (yearValue >= start && yearValue <= end) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  };

  // Function to reset the table to its initial condition (sorted by Paper no.)
  const resetTable = () => {
    const table = document.querySelector('.table tbody');
    const rowsArray = Array.from(table.getElementsByTagName('tr'));

    // Sort rows based on the Paper no. (first column, index 0)
    rowsArray.sort((rowA, rowB) => {
      const paperNoA = parseInt(rowA.getElementsByTagName('td')[0].textContent);
      const paperNoB = parseInt(rowB.getElementsByTagName('td')[0].textContent);
      return paperNoA - paperNoB;
    });

    // Re-insert rows in the sorted order (by Paper no.)
    rowsArray.forEach(row => table.appendChild(row));

    // Hide the range input fields and reset the dropdown selection
    setYearOption('');
    document.getElementById('yearRangeInputs').style.display = 'none';
    console.log("Table reset to initial condition and sorted by Paper no.");
  };

  // Function to reset the filter inputs and show all table rows
  const resetFilter = () => {
    // Reset the input fields
    setStartYear('');
    setEndYear('');

    // Show all rows in the table
    const table = document.querySelector('.table tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      rows[i].style.display = ''; // Show all rows
    }

    // Optionally reset table sorting if required
    resetTable();
  };

  // Effect to handle dark mode based on initial state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <body>    
      <div className='tablecont' id='main-container'>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Citation Table</title>
      {/* Bootstrap CSS */}
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link rel="icon" href="./images/Logo.svg" type="image/svg+xml" />{" "}
      {/* For .svg files */}
      <link href="styles.css" rel="stylesheet" />
      <div className="title">
        <img className="logoRef" src="./images/pccoe logo.png" alt="Logo" />
        <div>
          <h1>VirtuoNavi Literature Survey Study and Citations</h1>
          <h2>Total Citations :- 50 </h2>
        </div>
        <div className="logobtn">
          <img className="logoRef" src="./images/Logo.svg" alt="Logo" />
          <div className="switch">
            <input
              type="checkbox"
              id="modeToggle"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label htmlFor="modeToggle" />
          </div>
        </div>
      </div>
      <div id="yearRangeInputs" style={{ display: yearOption === 'filterRange' ? 'block' : 'none' }}>
        <label htmlFor="startYear">Start Year:</label>
        <input
          type="number"
          id="startYear"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          placeholder="Start Year"
        />
        <label htmlFor="endYear">End Year:</label>
        <input
          type="number"
          id="endYear"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          placeholder="End Year"
        />
        <button id='button-40' onClick={filterByYearRange}>Filter</button>
        <button id='button-40' onClick={resetFilter}>Reset</button>
      </div>
      <div className="container">
        {/* Light/Dark Mode Toggle */}
        <div className="table-wrapper">
          <table className='table table-strpied table-boredered table-hover'>
            <thead>
              <tr>
                <th>Paper no.</th>
                <th>Author</th>
                <th>
                  Year Of Publication
                  <select id="yearOptions" value={yearOption} onChange={handleYearOptions}>
                    <option value="">-- Select Option --</option>
                    <option value="reset">Reset to Initial Condition</option>
                    <option value="sortAsc">Sort Ascending</option>
                    <option value="sortDesc">Sort Descending</option>
                    <option value="filterRange">Filter by Range</option>
                  </select>
            </th>
            <th>Methodology Used</th>
            <th>Dataset</th>
            <th>Limitation/Future Scope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Xiang Haiyun</td>
            <td>2018</td>
            <td>
              The methodology used in this paper focuses on creating
              <br />a virtual campus roaming system for Qingdao University using
              the HTC VIVE platform.
            </td>
            <td>
              The page does not provide specific details about any dataset used
              in this project.
            </td>
            <td>
               Tactile and Olfactory Senses:
              <br /> Hardware Dependency
              <br /> Immersion Quality
              <br /> Sustainability
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sharad Sharma</td>
            <td>2015</td>
            <td>
              The methodology described in the paper focuses on creating
              immersive collaborative virtual reality environment.
            </td>
            <td>
              It doesn’t specify a particular dataset but mentions gathering
              data on human behavior and emergency response during these drills.
            </td>
            <td>
               Realism
              <br /> Behavior Simulation
              <br /> Building Access
              <br /> Technical Constrains
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Adlin Shaflina binti Azizo</td>
            <td>2020</td>
            <td>
              The methodology used in the paper focuses on simplifying the
              deployment of Serious Games (SGs) in Virtual Campuses (VCs)
            </td>
            <td>
              The paper discusses the use of learning analytics in the context
              of the Erasmus+ project IMPRESS. It mentions the RAGE-Analytics
              platform for tracking student progress and providing insights to
              teachers
            </td>
            <td>
               Version Compatibility
              <br /> Tool Support
              <br /> Future Support
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Adlin Shaflina binti Azizo</td>
            <td>2020</td>
            <td>
              The methodology used in the development of the Virtual Reality 360
              UTM Campus Tour with Voice Commands is detailed in three main
              phases:
              <br />
              1. VR Logic Phase
              <br />
              2. Design &amp; Development
              <br />
              3. Integration &amp; Testing
            </td>
            <td>
              It mainly discusses the methodology, system design, and testing
              phases of the project.
            </td>
            <td>
               Scope Change Due to COVID-19
              <br /> Internet Dependency
              <br /> Noisy Environments
              <br /> Limited Speech Recognition Features
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Li Zhang</td>
            <td>2011</td>
            <td>
              the methodology used to create a virtual campus
              <br />
              scene using VRML and other tools. Some of them are:
              <br />
              a. 3D Modelling
              <br />
              b. Texture Mapping
              <br />
              c. Lighting and Camera Setup
              <br />
              d. Integration and Optimization
            </td>
            <td>
              It focuses on the methods and tools employed, such as 3DSMAX,
              Photoshop, and VRMLPAD, to build and optimize the 3D models and
              scenes.
            </td>
            <td>
               Complexity and Performance
              <br /> File Size
              <br /> Optimization Needs
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Miguel Magdalena</td>
            <td>2020</td>
            <td>
              The methodology used in the development of the GENETVI web
              application is an adaptation of the Scrum framework.
            </td>
            <td>
              It doesn’t specify a particular dataset used but mentions the use
              of various technologies and frameworks like Laravel, HTML5, CSS,
              jQuery, and Bootstrap for the development of the application.
            </td>
            <td>
               Absence of formal mechanism
              <br /> Individual Processes
              <br /> Limited Data Integration
              <br /> Role Restrictions
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Wenxing Xu</td>
            <td>2017</td>
            <td>
              The key steps used are:
              <br />
              1. Data Collection and Processing
              <br />
              2. 3D Model Production
              <br />
              3. 3D Scene Production
              <br />
              4. Interactive Scene Creation
            </td>
            <td>
              The use of 3ds Max for 3D modeling and VRP-Builder for virtual
              reality development. The system includes features like virtual
              campus walkthroughs and user information interaction. The dataset
              used includes:
              <br /> Campus HD maps
              <br /> Campus CAD drawings
              <br /> Campus building photos
              <br /> Field measurements and estimates
            </td>
            <td>
              Here are some limitations mentioned:
              <br /> Lack of Data Integration
              <br /> Complexity and Cost
              <br /> Interactivity Issues
              <br /> Limited Scope
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Curtis Maines</td>
            <td>2015</td>
            <td>
              1. Survey of Existing Solutions:
              <br />
              2. Game Technology Application
              <br />
              3. Development Phases
              <br />
              4. Evaluation
            </td>
            <td>
              Instead, it focuses on the technologies and tools employed, such
              as game engines, 3D modeling software, and digital content
              creation tools, to develop the virtual campus tour.
            </td>
            <td>
              Limitations of existing virtual campus tour solutions are:
              <br /> Still Image Gallery
              <br /> Video Gallery
              <br /> 360° Interactive Virtual Tour
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Stephen Tang</td>
            <td>2015</td>
            <td>
              The methodology used in the VALUE @ Amrita Virtual Labs Project
              involves several key steps:
              <br />
              A. Experiment Selection
              <br />
              B. Development Process
              <br />
              C. Technology
              <br />
              D. Beta Testing
            </td>
            <td>
              It doesn’t specify a particular dataset used in the project.
              Instead, it focuses on the development and implementation of
              virtual laboratories for students across India, covering various
              disciplines like Biotechnology, Physical Sciences, and Chemical
              Sciences
            </td>
            <td>
               Access to Technology
              <br /> Hands-on Experience
              <br /> Adoption Rate
              <br /> Infrastructure Requirement
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Seiju Tsujinaga</td>
            <td>2018</td>
            <td>
              The methodology used in the interactive virtual campus tour system
              includes:
              <br /> VR Systems
              <br /> 3D Modelling
              <br /> Gesture Recognition
              <br /> User Evaluation
            </td>
            <td>
              The paper discusses the development of an interactive virtual
              campus tour system using Kinect &amp; an L-shaped stereoscopic
              display.
            </td>
            <td>
              Here are some limitations of the interactive virtual campus tour
              system described.
              <br /> Realism
              <br /> Gesture Recognition
              <br /> User Fatigue
              <br /> Limited Interactions
            </td>
          </tr>
          <tr>
            <td>11</td>
            <td>Mu Zhang et al.</td>
            <td>2012</td>
            <td>MPLS VPN technology and IPSec protocol</td>
            <td>
              The dataset includes network traffic logs, security breach
              reports, and performance metrics from a simulated campus network
              environment. These data points are used to evaluate the
              effectiveness of the MPLS VPN and IPSec integration.
            </td>
            <td>
              The study is limited by its reliance on simulation data rather
              than real-world deployment. Additionally, the performance metrics
              may not fully capture all variables in a live campus network
              environment, and the study's scope is restricted to a specific
              type of network configuration.
            </td>
          </tr>
          <tr>
            <td>12</td>
            <td>Azmi Mohd Yusof et al.</td>
            <td>2014</td>
            <td>
              The research explores the implementation of immersive virtual
              reality (VR) using an open-source game engine. The methodology
              involves developing VR applications, focusing on user experience,
              realism, and interactivity. The study evaluates different
              open-source game engines, selects the most suitable one, and
              details the development process, including design, coding, and
              testing phases.
            </td>
            <td>
              The dataset includes user feedback, performance data, and
              technical logs collected from various VR applications developed
              using the open-source game engine. Data points cover frame rates,
              latency, user interaction metrics, and qualitative feedback from
              user experience testing sessions.
            </td>
            <td>
              The study is limited by the capabilities and constraints of the
              selected open-source game engine, which may lack advanced features
              available in proprietary engines. Additionally, user testing was
              conducted on a small, non-diverse group, which may not represent
              all potential users. The findings may also be constrained by the
              specific hardware and software environments used during testing.
            </td>
          </tr>
          <tr>
            <td>13</td>
            <td>Sampath Shanmugam et al.</td>
            <td>2017</td>
            <td>
              The research introduces VRNav, a framework designed to improve
              navigation and object interaction in virtual reality (VR)
              environments. The methodology involves designing and developing
              VRNav using principles of human-computer interaction and testing
              it in various VR scenarios. The study focuses on creating
              intuitive navigation controls and enhancing object interaction
              through gesture recognition and controller inputs. User testing
              and iterative design are used to refine the framework.
            </td>
            <td>
              The dataset consists of user interaction data collected during
              testing sessions, including navigation paths, interaction
              frequencies, success rates of tasks, and user feedback on
              usability and comfort. This data is gathered from a diverse group
              of participants using different VR headsets and controllers to
              ensure varied input methods and user experiences.
            </td>
            <td>
              The study is limited by the range of VR hardware used, which may
              not cover all available devices, potentially affecting the
              generalizability of the results. Additionally, the framework's
              performance may vary with different VR environments and
              complexities. The participant pool, though diverse, might still be
              limited in size, potentially impacting the robustness of the
              conclusions drawn from user feedback and interaction data.
            </td>
          </tr>
          <tr>
            <td>14</td>
            <td>Philip. Moore et al.</td>
            <td>2013</td>
            <td>
              The research explores the use of virtual campuses to enhance
              collaboration in tertiary education. The methodology involves
              designing and implementing a virtual campus environment using
              virtual reality (VR) and 3D collaboration tools. It includes
              surveys and interviews with educators and students, as well as
              observational studies of virtual classroom interactions. The study
              assesses the impact of the virtual campus on engagement,
              collaboration, and learning outcomes.
            </td>
            <td>
              The dataset comprises survey responses, interview transcripts, and
              observational data from students and faculty members who
              participated in the virtual campus environment. Additionally, data
              on participation rates, interaction frequencies, and user
              engagement metrics within the virtual campus are collected to
              analyze the effectiveness of the collaborative tools.
            </td>
            <td>
              The study is limited by the technological access and familiarity
              of participants with VR and 3D collaboration tools, which may
              influence their experiences and feedback. The virtual campus
              environment's effectiveness may vary depending on the subject
              matter and teaching style, limiting the generalizability of the
              findings across different educational contexts. Additionally, the
              participant sample may not be representative of all tertiary
              education students and educators, potentially affecting the
              universality of the conclusions.
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>Mu Zhang et al.</td>
            <td>2012</td>
            <td>
              The research paper discusses VCUHK, a project that integrates
              real-world elements into a 3D virtual campus using networked
              virtual worlds. The methodology involves designing a virtual
              campus that mirrors the physical campus layout and facilities. The
              study employs user-centered design principles and iterative
              development, incorporating feedback from students and staff. It
              also includes testing for usability, immersion, and engagement in
              the virtual environment.
            </td>
            <td>
              The dataset includes 3D models and digital representations of the
              real-world campus, user interaction logs, feedback from surveys,
              and interviews conducted with students and faculty members. Data
              on navigation patterns, time spent in different virtual areas, and
              user engagement levels are also collected to evaluate the
              effectiveness of the virtual campus.
            </td>
            <td>
              The study's limitations include potential discrepancies between
              the virtual and real-world environments that may affect user
              perception and interaction. The reliance on specific hardware and
              software for the virtual environment could limit the accessibility
              and scalability of the virtual campus. Additionally, the
              participant pool may be limited in size and diversity, affecting
              the generalizability of the findings across different user groups.
              The novelty of the virtual environment may also result in a
              learning curve that impacts user experience and feedback.
            </td>
          </tr>
          <tr>
            <td>16</td>
            <td>Tomoko Tatetama et al.</td>
            <td>2018</td>
            <td>Virtual Reality system</td>
            <td>
              Figure.6 shows that user demonstrate virtual campus guide <br />
              system of Hiroshima Institute of Technology. On the <br />
              smartphone, as you can see from Figure.5, that the campus <br />
              model is visualized from two different perspectives. Through{" "}
              <br />
              this different viewpoint, stereoscopic vision can be realized{" "}
              <br />
              into 3D virtual space. On the smartphone, it can be confirmed{" "}
              <br />
              from Figure.6 that the campus model is visualized from two <br />
              different perspectives. Through this different viewpoint, <br />
              stereoscopic viewing is given, and the user can obtain <br />
              immersive feeling. <br />
              In order to confirm the effectiveness of the proposed <br />
              system, 60 users experienced the system, and then, we <br />
              collected subjective evaluations based on the questionnaire.{" "}
              <br />
              Figure.7 shows the result of the questionnaire survey in <br />
              accordance with Likert scale. It can be seen that the <br />
              questionnaire was highly evaluated in all item
            </td>
            <td>
              this research need to consider improvement of review of
              information quantity for representation and visualization of
              accurate polygon is required from now on.
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>Liu Hongqi</td>
            <td>2012</td>
            <td>
              OpenGL and VC++ in the construction, along with CAD modeling and
              3DS MAX polygon modeling, and realize several functions
            </td>
            <td>
              Virtual campus cruise system is the comprehensive <br />
              application of virtual reality, applicable to the earlier <br />
              illustration and verification of the public buildings and city{" "}
              <br />
              design program, etc. Using this campus cruise system, we <br />
              can vividly show the overall design of the campus <br />
              environment to make the students know the campus easily <br />
              and help them to have a good tour. <br />
              The focus of this system is adopting the Open GL <br />
              program, designing and realizing the cruise system in the <br />
              virtual campus, which laid a good foundation for the <br />
              digitalization of the actual buildings
            </td>
            <td>
              the virtual campus cruise system is the comprehensive use of
              virtual reality, we cannot make deeper research on all the
              concerned technology, thus the realized system has some
              disadvantages, such as the construction of the motion object
            </td>
          </tr>
          <tr>
            <td>18</td>
            <td>Jin Rong</td>
            <td>2020</td>
            <td>Virtual Reality system</td>
            <td>
              .In the process of exploration in the field of education, people
              have found that virtual reality technology can improve teaching
              methods, develop modern ideas, improve teaching level, improve
              teacher-student interaction, integrate teaching resources and
              other advantages
            </td>
            <td>
              At present, <br />
              the threshold of virtual reality related equipment is gradually{" "}
              <br />
              lowered
            </td>
          </tr>
          <tr>
            <td>19</td>
            <td>Qiuxiang Wang</td>
            <td>2011</td>
            <td>Virtual simulation</td>
            <td>
              we built 3D model of South China Agriculture University according
              to the merits of two major modeling software 3ds Max and Multi
              Creator, analyzed cautions in practical operation. It will provide
              valuable experiences for the relevant fields of digital city.
              Meanwhile, the following work is establishing attribute database
              for the virtual campus, realizing the function integration with
              campus information query as well as adding dynamic objects and
              specific behavior objects, finally realizing the integration of
              virtual reality technology and geographic information system.
            </td>
            <td>
              The primary limitations in constructing a 3D model of a virtual
              campus include the significant computational resources required
              for high-detail rendering and the challenge of ensuring accurate
              and realistic representations of physical spaces, which may lead
              to discrepancies between the virtual and real environments.
              Additionally, maintaining the model's scalability and
              compatibility with various devices can be difficult, potentially
              limiting accessibility and user experience.
              <br />
            </td>
          </tr>
          <tr>
            <td>20</td>
            <td>Leonardo Moreira Faêda</td>
            <td>2018</td>
            <td>
              A semiotic study on virtual reality games and simulations
              typically employs methodologies such as content analysis,
              ethnography, and discourse analysis. These methods focus on
              examining the visual, auditory, and interactive symbols within the
              virtual environment to understand how they convey meaning and how
              players interpret and engage with these elements.
            </td>
            <td>
              A semiotic study on virtual reality games and simulations would
              use a dataset comprising in-game content, including visual
              elements, audio cues, narrative text, player interactions, and
              user feedback. The dataset may also include recorded gameplay
              sessions, transcripts of player dialogue, and user-generated
              content, all of which are analyzed to understand how meaning is
              constructed and interpreted within the VR environment. This data
              helps in identifying the signs and symbols that contribute to the
              immersive experience.
              <br />
            </td>
            <td>
              A semiotic study of VR games and simulations may face limitations
              such as a narrow focus on specific semiotic elements, potential
              obsolescence due to rapid technological advancements, subjective
              interpretations, small or unrepresentative samples, variability in
              user experiences, and the evolving nature of VR symbols.
              Additionally, data collection methods might introduce biases, and
              there could be ethical concerns related to user consent and
              privacy
            </td>
          </tr>
          <tr>
            <td>21</td>
            <td>Wang Li</td>
            <td>2019</td>
            <td>Humanized interaction design</td>
            <td>
              For a research paper on a 3D virtual campus using Unity3D, the
              dataset typically includes user interaction logs, feedback and
              survey responses, performance metrics, design elements (like 3D
              models and scripts), user demographics, and usage statistics.
            </td>
            <td>
              The limitations of a research paper on a 3D virtual campus using
              Unity3D may include constraints imposed by the technology and
              hardware used, which can affect the performance and functionality
              of the virtual environment. The study might suffer from a small or
              non-representative sample size, impacting the generalizability of
              findings. User feedback can be highly subjective and vary
              significantly, complicating the interpretation of results.
              Additionally, performance issues may arise due to differences in
              users' systems, and design limitations within Unity3D could affect
              the overall effectiveness and user experience of the virtual
              campus.
            </td>
          </tr>
          <tr>
            <td>22</td>
            <td>Luqi Xin</td>
            <td>2012</td>
            <td>
              we used the Flash software to make 2D virtual campus system
              platform, which was developed by AS 3.0 program language.
            </td>
            <td>
              In a research paper on virtual campus design and development, the
              dataset typically encompasses design specifications, including
              architectural plans and design elements; user interaction data,
              such as logs of activities within the virtual environment;
              feedback and survey responses from users regarding their
              experiences and satisfaction; performance metrics, which track
              system performance like load times and frame rates; and
              demographic information about the users engaging with the virtual
              campus.
            </td>
            <td>
              Limitations of a research paper on virtual campus design and
              development may include technology constraints, a small or
              unrepresentative user sample, subjective feedback, performance
              issues due to varied hardware, and inherent design limitations.
            </td>
          </tr>
          <tr>
            <td>23</td>
            <td>Chang Zhang</td>
            <td>2020</td>
            <td>3D modeling process</td>
            <td>
              In a research paper on 3D scene modeling for a virtual campus, the
              dataset generally includes 3D models detailing the textures and
              geometries used in the scene, along with design specifications
              covering architectural and environmental aspects. It also involves
              user interaction data, which tracks how users engage with the 3D
              environment, performance metrics that assess rendering times,
              frame rates, and system requirements, and feedback and surveys
              from users evaluating the usability and aesthetics of the 3D
              scene.
            </td>
            <td>
              Limitations of a research paper on 3D scene modeling for a virtual
              campus may include constraints related to the technology used,
              which can affect model quality and performance. The study might be
              limited by a small or non-representative sample of users, making
              it hard to generalize findings. Subjective user feedback may vary,
              and performance issues could arise from different hardware
              configurations. Additionally, design constraints might impact the
              effectiveness of the 3D scene.
            </td>
          </tr>
          <tr>
            <td>24</td>
            <td>Guoyang Liu</td>
            <td>2019</td>
            <td> VR technology Unity3D and Sketch Up modeling tool</td>
            <td>
              In a research paper on the design and implementation of a virtual
              campus roaming system based on Unity3D, the dataset generally
              includes system design documentation outlining the architecture
              and features of the roaming system. It also contains 3D models and
              assets used within the Unity3D environment, user interaction data
              that tracks movements and interactions within the virtual campus,
              performance metrics such as load times and frame rates, and user
              feedback on their experience with the roaming system.
            </td>
            <td>
              Limitations of a research paper on a virtual campus roaming system
              based on Unity3D may include constraints imposed by the technology
              and hardware used, which can affect system performance and user
              experience. The study might suffer from a small or
              unrepresentative user sample, impacting the generalizability of
              the findings. Subjective user feedback could vary widely, and
              performance issues may arise from differing hardware
              configurations. Additionally, design limitations in Unity3D might
              constrain the effectiveness and realism of the roaming system.
            </td>
          </tr>
          <tr>
            <td>25</td>
            <td>Jen-Perng Yu</td>
            <td>2014</td>
            <td>Google Earth API</td>
            <td>
              In a research paper on a Bezier curve-based tour generator for
              navigation in a Google Earth-based virtual campus, the dataset
              generally includes information on the Bezier curves used to design
              tour paths, along with detailed data on the specific routes and
              navigation sequences created. It also involves data on the
              integration of the virtual campus within Google Earth, user
              interaction logs that track navigation and engagement with the
              tour, performance metrics assessing system load times and
              navigation smoothness, and user feedback on their overall
              experience with the tour generator.
            </td>
            <td>
              The limitations of a research paper on a Bezier curve-based tour
              generator for a Google Earth-based virtual campus may include
              constraints related to the accuracy and smoothness of the Bezier
              curves, which can impact tour navigation quality. The study might
              also be limited by the integration challenges with Google Earth,
              variations in user hardware affecting performance, and a small or
              non-representative user sample that affects the generalizability
              of findings. Additionally, user feedback might be subjective, and
              performance issues could arise due to different system
              configurations.
            </td>
          </tr>
          <tr>
            <td>26</td>
            <td>G. Gröger et al.</td>
            <td>2017</td>
            <td>GIS data and 3D GIS technology</td>
            <td>Vietnam National University</td>
            <td>
              developing 3D GIS system VNU campus at higher level of details. In
              addition, automatic techniques for GIS data generation are focused
              to reduces cost when larger models are developed.
            </td>
          </tr>
          <tr>
            <td>27</td>
            <td>Peng Cheng et al.</td>
            <td>2011</td>
            <td>
              arly data collection, 3D modeling and mapping, scene optimization,
              design and implementation of interactive scenes
            </td>
            <td>Vietnam National University</td>
            <td>
              With more introduction of a number of virtual simulation platform,
              the more virtual campus system will be developed to service the
              teaching and research better.
            </td>
          </tr>
          <tr>
            <td>28</td>
            <td>Takashi Kurimoto</td>
            <td>2018</td>
            <td>
              multiple network functions virtualization (NFV)-based campus area
              networks (CANs)
            </td>
            <td>
              {" "}
              universities and research institutions have their own campus
              information and communication technology
            </td>
            <td> -</td>
          </tr>
          <tr>
            <td>29</td>
            <td>Zihong Yan </td>
            <td>2024</td>
            <td>Region-Wise Hash Map Structure</td>
            <td>
              novel map construction framework based on 3D region-wise hash map
              structure (RH-Map)
            </td>
            <td> -</td>
          </tr>
          <tr>
            <td>30</td>
            <td>YU DING</td>
            <td>2020</td>
            <td>IOT and VR</td>
            <td>
              data accumulation generated by virtual reality interaction between
              mobile client and cloud platform database
            </td>
            <td> -</td>
          </tr>
          <tr>
            <td>31</td>
            <td>QIAN ZHANG1</td>
            <td>2020</td>
            <td>Application and Practice of VR Virtual Education</td>
            <td>
              The sports and teaching data of the virtual reality system data
              center of physical education has reached 6000G since its trial
              operation, including the teaching and sports data of 50000
              students and on-the-job teaching staff.
            </td>
            <td>
              increasing and in-depth demand for physical education in Colleges
              and universities in the future.
            </td>
          </tr>
          <tr>
            <td>32</td>
            <td>CATARINA MOREIRA</td>
            <td>2022</td>
            <td>
              combined a Virtual Environment with Discussion Tools and Video
              Conferencing, Broadcast, and Online Tools to facilitate and engage
              effective social interactions.
            </td>
            <td>
              To ensure a robust data analysis, we had to intersect different
              data sources, such as participants’ registration data, with their
              interactions in Discord
            </td>
            <td />
          </tr>
          <tr>
            <td>33</td>
            <td>Kazuhiro Yasuda</td>
            <td>2023</td>
            <td>
              Three-dimensional (3D) virtual environment to evaluate the effects
              of eliminating stimuli in the rightward space and directing
              attention to the left on neglect symptoms.
            </td>
            <td />
            <td> - </td>
          </tr>
          <tr>
            <td>34</td>
            <td>HUIYU LI</td>
            <td>2020</td>
            <td>
              Voronoi-based method to generate paths called the skeleton graph
              consisting of navigable paths and way-points.
            </td>
            <td>
              The measures used to investigate the performance include:
              navigation time, collision numbers and redirection rate. The
              navigation time
            </td>
            <td>
              expand the reachable areas of the virtual space, we extend all
              waypoints and paths of both virtual and real skeleton graphs in an
              appropriate manner, single user walking in.
            </td>
          </tr>
          <tr>
            <td>35</td>
            <td>Muhammad Wannous Et al.</td>
            <td>2010</td>
            <td>
              modular Web-based laboratory (NVLab) suitable for ICT courses
              <br /> that require the individual learner to work on multiple
              networked <br />
              devices. Learners will use the tools NVLab includes to produce a
              <br /> network design and then construct it on the server. After
              this phase
              <br /> is completed, learners will be able to connect to the
              server and work <br />
              on their networks.
              <br />
              Web-based Computer Networks laboratory (NVLab) where
              <br />
              students can freely practice on designing, configuring, and
              <br />
              troubleshooting a network scenario{" "}
            </td>
            <td>-</td>
            <td>
              1.Modifying the laboratory structure to accept more than one user
              logging to the system.
              <br />
              2.Improving Builder to make the creation of the Virtual Machines
              faster (currently one VM takes
              <br />
              4-5 minutes to be created).
              <br />
              3.Implementing the laboratory in real environment to test it
              quantitatively
            </td>
          </tr>
          <tr>
            <td>36</td>
            <td>Ryo Nitami Et al.</td>
            <td>2014</td>
            <td>
              an application such as SLAM, which simultaneously performs
              environmental mapmaking and self-position estimation through the
              use of images.
            </td>
            <td>
              This system requires that a quadrocopter be prepared and that
              detailed map data be created as infrastructure for navigation.
              <br /> using indoor cognitive information obtained by advanced
              survey questionnaires and data analysis
            </td>
            <td>
              1. To conduct subjective evaluations by pedestrians in multiple
              universities to evaluate the effectiveness of this application.{" "}
              <br />
              2. attempts will be made to improve the integrity of navigation in
              order to realize a practical system.
              <br />
              3.this navigation sysem can be applied to other types of buildings
              and even seat numbering patterns in trains and theatres.
            </td>
          </tr>
          <tr>
            <td>37</td>
            <td>Xie Dang-en Et al. </td>
            <td>2015</td>
            <td>
              In this paper, a campus navigation system is designed based on
              Baidu map API,
              <br /> using PHP, JavaScript and xml technologies.The system can
              provide the basic map
              <br /> function and search the path navigation between any two
              points in the campus.
            </td>
            <td>
              In this paper, we have to organize their own school through the
              main attractions,
              <br /> buildings and other objects of geographic data, and save
              the local database, then Baidu
              <br /> map interface to re-route navigation package, realized
              inside the campus navigation path, <br />
              make up Baidu map small area inside the navigation path blank.
            </td>
            <td>
              Baidu Map provides a powerful electronic map function,
              refresh-free access to its browser-based, and
              <br />
              convenient. However, within a specific region it cannot meet the
              needs of teachers and students to show the daily life of learning.
              <br />
              In the future work, we’ll make further study on extending the
              system to suitable for the mobile device, so
              <br />
              that the software can bring a better experience and convenience.
            </td>
          </tr>
          <tr>
            <td>38</td>
            <td>Defu LI Et al.</td>
            <td>2015</td>
            <td>
              using bidirectional search in the basic implementation of A*
              algorithm and adding a path cache function and an anticipation
              mechanism. Path cache made full use of the paths which had been
              calculated by A* algorithm to decrease the delay of figuring out
              the path. To a large extent, it accelerates the server’s response
              and increases the throughput of the server.
            </td>
            <td>
              Using data block organization for path planning improves the
              planning time efficiency. Data block organization is to divide
              area which is covered by road network data into blocks.
              <br />
              JSON data type is used for the operation and routing of data and
              navigation.
            </td>
            <td>
              his paper just refers to the preliminary optimization to the
              campus navigation system. There is plenty room remaining to
              continue to optimize the system, so it has yet to have further
              research.
            </td>
          </tr>
          <tr>
            <td>39</td>
            <td>Susovan Jana Et al.</td>
            <td>2015</td>
            <td>
              The application has been implemented using Android SDK, Google
              Maps GPS and has been tested for two campuses of Jadavpur
              University{" "}
            </td>
            <td>
              MYSQL database was utilized for creating the dataset for the
              android app.
            </td>
            <td>
              1. Audio Controls: Incorporating speech-activated control could
              benefit visually impaired users by providing audio alerts to guide
              them through locations. This could reduce their stress when
              navigating unfamiliar areas.
              <br />
              2. Indoor Location Tracking: While GPS-based location tracking is
              not suitable for indoor environments, integrating Wi-Fi-based
              tracking could improve the system's functionality within
              buildings.
              <br />
              3. More Sophisticated and Customized Maps: Creating more detailed
              and tailored maps, especially for rapidly changing rural areas,
              could enhance the system's usefulness in various locations.
            </td>
          </tr>
          <tr>
            <td>40</td>
            <td>LIEN-WU CHEN Et al.</td>
            <td>2018</td>
            <td>
              a smart campus care and guiding framework with deep learning-based
              face recognition, called DeepGuiding, for students through
              Internet of Things technologies
            </td>
            <td>
              sent to the DeepGuiding server for constructing the database of
              face recognition and video classification
            </td>
            <td>
              In Future proposed a model for IoT-based
              <br />
              healthcare systems, which consists of wearable sensors,
              <br />
              short-range and long-range communications, cloud-based
              <br />
              storage, and machine learning. In particular, IoT-based
              <br />
              healthcare systems are facing security, privacy, wearability,
              <br />
              and low-power operation challenges.
            </td>
          </tr>
          <tr>
            <td>41</td>
            <td>Enwei Zhang Et al.</td>
            <td>2019</td>
            <td>
              The campus navigation map is produced by high-resolution remote
              sensing images, and it has high data space resolution, which
              effectively improves the data quality
            </td>
            <td>
              This data uses ArcGIS Online for data cloud storage and
              management, achieved the interactive updates between data and
              users and solve the problem of complicated navigation data upgrade
            </td>
            <td>
              for closed area like university campus is not very well adapted,
              there are problems such as local data inaccuracy, data loss,
              unable to navigate and so on. Building a campus navigation system
              can provide an effective solution for campus travel, and can
              accurately navigate in the campus
            </td>
          </tr>
          <tr>
            <td>42</td>
            <td>C. Chotbenjamaporn Et al.</td>
            <td>2019</td>
            <td>
              To increase the efficiency of traveling inside the university
              campus, <br />
              this project aims to provide shortest/fastest routes considering
              all
              <br /> available transportation means on campus. In addition, the
              proposed <br />
              system provides searchable informative maps inside university
              buildings
              <br /> to aid indoor navigation, as well as maps of important
              landmarks, <br />
              e.g., ATM machines and canteens, around the university campus.
            </td>
            <td>
              The web-based application was created using JavaScript with the
              help of Google’s API.
              <br /> HTML, CSS and Bootstrap were used to develop the front-end
              web application, while
              <br /> Node.js and Express.js were used to develop the back-end
              system. <br />
              Google Cloud Platform [15] was used as the database to collect
              readings from sensors.
              <br /> ThingSpeak [16] was used for data analytics and the coding
              was done in Arduino IDE
              <br /> and Microsoft Visual Studio. On the hardware side, NodeMCU
              was connected to sensors for real-time temperature, humidity and
              PM2.5 monitoring.
            </td>
            <td>
              {" "}
              The system comprises both the outdoor navigation system and the
              <br />
              indoor navigation system that together enhance users’
              <br />
              experience when trying to locate classes, rooms, buildings
              <br />
              or landmarks at a university campus. The team aims towards
              <br />
              providing an essential solution for a smart campus by
              <br />
              integrating tools and technologies.{" "}
            </td>
          </tr>
          <tr>
            <td>43</td>
            <td>Tomoya Wada Et al</td>
            <td>2020</td>
            <td>
              a user interface that makes indoor navigation intuitive by
              displaying text information, augmented reality (AR), and a plane
              view from information of QR codes scanned with a smart phone.
            </td>
            <td>-</td>
            <td>
              deal with problems such as route re-search in putting the system
              to practical use as an indoor navigation system.
            </td>
          </tr>
          <tr>
            <td>44</td>
            <td>Tina Sayapogu Et al.</td>
            <td>2021</td>
            <td>
              For Indoor Navigation, Augmented Reality uses its inbuilt
              characteristics to determine a person's position and provide the
              necessary navigation directive.
              <br />
              This project makes use of technologies like Unity, ARCore and
              Navmesh etc.{" "}
            </td>
            <td>-</td>
            <td>
              The new modules can consist of a gaming section where students can
              play AR games like X and 0 or may be an AR View section for
              professors to explain various devices or its parts and motors etc,
              To make new posters for upcoming workshops or even adding a GPS
              module to make it usable for off campus areas etc
            </td>
          </tr>
          <tr>
            <td>45</td>
            <td>Tomoko Tatetama</td>
            <td>2018</td>
            <td>
              In this paper, we propose a novel and effective <br />
              Campus Guidance system based on Virtual Reality system. In <br />
              general, many guidance systems require not only a high-capacity{" "}
              <br />
              presentation system but also a large device and location whether{" "}
              <br />
              VR system including or not. To overcome this problem, our <br />
              system visualizes on common smartphone device (android mobile{" "}
              <br />
              phone) and VR goggle, for VR campus demonstration system. <br />
              The system can provide an effective and high-cost performance{" "}
              <br />
              system to support for VR campus guidance.
            </td>
            <td>
              The page does not provide specific details about any dataset used
              in this project.
            </td>
            <td>
              {" "}
              Scalability
              <br /> Hardware Dependency
              <br /> Sustainability
            </td>
          </tr>
          <tr>
            <td>46</td>
            <td>PO-SHENG CHIU1</td>
            <td>2020</td>
            <td>
              {" "}
              At present, most university campus app is presented in the form of
              static web
              <br /> pages or app menus. This study mainly developed a Deep
              Neural Network (DNN) based emotionally aware
              <br /> campus virtual assistant. Idea basically foucses on
              creating a virtual assistance as campus guide.
            </td>
            <td>
              Taiwans colleges and universities exclusive apps (source: google
              play).Ming Chuan university (tauyuan, taiwan, R.O.C.) exclusive
              <br /> app (source: google play).
            </td>
            <td>
              {" "}
              Data set handeling
              <br /> Rerouting or any change wil not be easy to make <br />{" "}
              Complexity
            </td>
          </tr>
          <tr>
            <td>47</td>
            <td>MIRZA ABDUR RAZZAQ</td>
            <td>2021</td>
            <td>
              The cloud services users mostly suffer from service delays and
              disruptions
              <br /> due to service cloud resource management based on vertical
              and horizontal scalable systems. Adding
              <br /> more resources to a single cloud server is called vertical
              scaling, and an increasing number of servers is
              <br /> known as horizontal scaling. The service-bursts signi
              cantly impact the vertical scaled environment where
              <br /> the scale-up degrades the service quality and users trust
              after reaching the servers maximum capacity.
              <br /> Besides, the horizontally scaled environment, though being
              resilient, is cost-inef cient. It is also hard to
              <br /> detect and manage bursts online to sustain application ef
              ciency for complex workloads. Burst detection
              <br /> in real-time workloads is a complicated issue because even
              in the presence of auto-scaling methods,
              <br /> it can dramatically degrade the applications ef ciency.{" "}
            </td>
            <td>
              It doesn’t specify a particular dataset used but mentions the use
              of various technologies and frameworks.
            </td>
            <td>
              {" "}
              Realism
              <br /> Behavior Simulation
              <br /> Optimization
              <br /> Dataset Handelig
            </td>
          </tr>
          <tr>
            <td>48</td>
            <td>XUESONG ZHAI</td>
            <td>2018</td>
            <td>
              With the increasing development of information technology and
              emerging of modern mobile
              <br /> devices, researchers have been shedding light on the
              integration of ubiquitous learning and online games in
              <br /> the construction of smart campus, aiming to enhance the
              online users learning performance and perceptions.
              <br /> However, challenges of such blend learning model, for
              example, how to avoid the learners distraction from
              <br /> online games, triggered many concerns from software
              engineers and educators. This paper investigated
              <br /> the factors and driving mechanism to construct a learners
              technology engagement (TE) model towards
              <br /> ubiquitous game-based learning (UGL) in the smart campus
              context.
            </td>
            <td>
              It provides dataset research of UGL model based analysis which was
              performed on people of different age groups. Also provides
              statisticle analysis of provided dataset in order to calculate
              terms such as mean, SD, etc. which will in end help to finalize
              the conclusion of the project.
            </td>
            <td>
              {" "}
              Cost Effeciency
              <br /> Algorithum complexity
              <br /> Scalability
              <br />{" "}
            </td>
          </tr>
          <tr>
            <td>49</td>
            <td>WEI ZHANG</td>
            <td>2018</td>
            <td>
              Themultimediaconference system is a widely used application for
              smart campus. Meanwhile,
              <br /> cloud computingis
              anewcomputingmodelthathasbeenrapidlydeveloping.Itisachallenging
              research task
              <br /> to utilize the advantages of cloud computing with respect
              to multimedia conference system technology. This
              <br /> paper designs and implements a multi-source multimedia
              conference system assisted by cloud computing
              <br /> called MMCSACC.
            </td>
            <td>
              It mainly discusses the methodology, system design, and testing
              phases of the project. Also disscussesthe technology called as
              MMCSACC
            </td>
            <td>
              {" "}
              Algorithum complexity
              <br /> Network Dependancy
            </td>
          </tr>
          <tr>
            <td>50</td>
            <td> ZHIQING ZHOU</td>
            <td>2020</td>
            <td>
              Inordertostrengthen school security and build a wireless smart
              campus, this article optimizes the existing wireless video
              surveillance system based on the Internet of Things. This paper
              rst optimizes the surveillance quality in the video surveillance
              system, and proposes a zero-copy buffer strategy, a network
              congestion suppression strategy, and a codec rate coordination
              strategy. Secondly, for the distributed wide area video
              surveillance system, a tracking optimization method based on
              multi-camera fusion is proposed. Finally, this paper constructs a
              Bayesian monitoring event modeling method based on genetic
              algorithm. Experimental results show that the optimized video
              surveillance system has basically stable delay, signi cantly
              reduced packet loss rate, and smooth video playback. This method
              can effectively realize the coordinated tracking of multiple
              cameras in a wide-area monitoring scenario, achieve high tracking
              and monitoring performance, and meet the requirements of smart
              campus construction.
            </td>
            <td>
              Pingdingshan
              <br /> University Fund Carry Forward Project
            </td>
            <td>
              {" "}
              Lack of Data Integration
              <br /> Data vunarability
              <br /> Whole iot network must be password protected
              <br /> Hardware dependacy
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  {/* Bootstrap JS and dependencies */}
</div>
</body>


)
  
}
export default References;