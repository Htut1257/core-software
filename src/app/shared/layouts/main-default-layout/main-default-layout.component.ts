import { Component, OnInit,AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { VERSION } from '@angular/core';
import { SidebarService } from 'src/app/core/services/layout/sidebar.service';
import { NavItem,MenuItem} from 'src/app/core/models/nav-item.model';
@Component({
  selector: 'app-main-default-layout',
  templateUrl: './main-default-layout.component.html',
  styleUrls: ['./main-default-layout.component.css']
})
export class MainDefaultLayoutComponent implements OnInit,AfterViewInit {
  navItems: NavItem[] = [
    {
      displayName: 'DevFestFL',
      iconName: 'recent_actors',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'devfestfl/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'devfestfl/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'devfestfl/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'devfestfl/feedback'
        }
      ]
    },
    {
      displayName: 'Disney',
      iconName: 'videocam',
      route: 'disney',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'disney/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'disney/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'disney/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'disney/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'disney/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'disney/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'disney/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'disney/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'disney/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'disney/sessionswhat-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'disney/sessionsmy-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'disney/sessionsbecome-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'disney/feedback'
        }
      ]
    },
    {
      displayName: 'Orlando',
      iconName: 'videocam',
      route: 'orlando',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'orlando/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'orlando/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'orlando/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'orlando/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'orlando/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'orlando/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'orlando/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'orlando/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'orlando/feedback'
        }
      ]
    },
    {
      displayName: 'Maleficent',
      iconName: 'videocam',
      route: 'maleficent',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'maleficent/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'maleficent/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'maleficent/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'maleficent/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'maleficent/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'maleficent/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'maleficent/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'maleficent/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'maleficent/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'maleficent/feedback'
        }
      ]
    },
  ];

  

  @ViewChild('appDrawer') appDrawer!:ElementRef
  version=VERSION
  constructor(public sideService:SidebarService) { }

  ngOnInit(): void {
    this.navItems=[
      {
        displayName: 'Setup',
        iconName: 'Setup',
        route: 'setup',
        children: [
          {
            displayName: 'Bonus',
            iconName: 'bonus',
            route: 'main/bonus',
            children: []
          },
          {
            displayName: 'City',
            iconName: 'City',
            route: 'main/city',
            children: []
          },
          {
            displayName: 'Deduction',
            iconName: 'Deduction',
            route: 'main/deduction',
            children: []
          },
          {
            displayName: 'Department',
            iconName: 'Department',
            route: 'main/department',
            children: []
          },
          {
            displayName: 'Employee',
            iconName: 'employee',
            route: 'main/employee',
            children: []
          },
          {
            displayName: 'Holiday',
            iconName: 'Holiday',
            route: 'main/holiday',
            children: []
          },
          {
            displayName: 'Increment',
            iconName: 'increment',
            route: 'main/increment',
            children: []
          },
          {
            displayName: 'Job',
            iconName: 'Job',
            route: 'main/job',
            children: []
          },
          {
            displayName: 'late',
            iconName: 'late',
            route: 'main/late',
            children: []
          },
          {
            displayName: 'Leave',
            iconName: 'leave',
            route: 'main/leave',
            children: []
          },
          {
            displayName: 'Ot',
            iconName: 'ot',
            route: 'main/ot',
            children: []
          },
          {
            displayName: 'Payday',
            iconName: 'Payday',
            route: 'main/payday',
            children: []
          },
          {
            displayName: 'Shift',
            iconName: 'Shift',
            route: 'main/shift',
            children: []
          },
        ]
      },
      {
        displayName: 'Assign',
        iconName: 'Assign',
        route: 'assign',
        children: [
          {
            displayName: 'Bonus ',
            iconName: 'BonusAssign',
            route: 'main/bonus-assign',
          },
          {
            displayName: 'Deduction ',
            iconName: 'DeductionAssign',
            route: 'main/deduction-assign',
          },
          {
            displayName: 'Department ',
            iconName: 'DepartmentHistory',
            route: 'main/department-assign',
          },
          {
            displayName: 'Job ',
            iconName: 'JobHistory',
            route: 'main/job-assign',
          },
          {
            displayName: 'Leave ',
            iconName: 'LeaveHistory',
            route: 'main/leave-assign',
          },
          {
            displayName: 'Roster',
            iconName: 'Roster',
            route: 'main/roster',
          },
        ]
      },
      {
        displayName: 'Attendance',
        iconName: 'Attendance',
        route: 'attendance',
        children: []
      },
      {
        displayName: 'Report',
        iconName: 'Report',
        route: 'report',
        children: []
      }
    ]
    console.log('called');
  }

  ngAfterViewInit(): void {
    this.sideService.appDrawer=this.appDrawer
  }

} 
