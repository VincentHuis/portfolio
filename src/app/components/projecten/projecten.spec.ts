import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Projecten} from './projecten';

describe('Projecten', () => {
  let fixture: ComponentFixture<Projecten>;
  let component: Projecten;
  let element: HTMLElement;

  beforeEach(async () => {
    Element.prototype.scrollIntoView = vi.fn();
    await TestBed.configureTestingModule({imports: [Projecten]}).compileComponents();
    fixture = TestBed.createComponent(Projecten);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  const click = async (selector: string, index = 0) => {
    element.querySelectorAll<HTMLButtonElement>(selector)[index].click();
    await fixture.whenStable();
  };

  it('shows the highlights first, followed by four regular projects in a grid', () => {
    const highlights = element.querySelectorAll('.project-card--highlight .card-title');
    const regular = element.querySelectorAll('.project-grid .project-card');

    expect([...highlights].map(h => h.textContent)).toEqual(['Tender AI', 'Croptimise']);
    expect(regular.length).toBe(4);
    expect(element.querySelector('.project-detail')).toBeNull();
  });

  it('shows all regular projects with the more button and collapses them again', async () => {
    const button = element.querySelector<HTMLButtonElement>('.more-button')!;
    expect(button.textContent).toContain('Meer projecten');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    await click('.more-button');

    expect(element.querySelectorAll('.project-grid .project-card').length).toBe(component.projects.length - 2);
    expect(button.textContent).toContain('Minder projecten');
    expect(button.getAttribute('aria-expanded')).toBe('true');

    await click('.more-button');

    expect(element.querySelectorAll('.project-grid .project-card').length).toBe(4);
  });

  it('opens the detail view with full text instead of the overview when a project is clicked', async () => {
    await click('.project-card');

    expect(component.selectedProject()?.slug).toBe('tender-ai');
    expect(element.querySelector('.project-overview')).toBeNull();
    expect(element.querySelector('.detail-title')?.textContent).toBe('Tender AI');
    expect(element.querySelector('.detail-description')?.innerHTML).toContain('Over het project');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('lists all other projects in the sidebar and switches when one is clicked', async () => {
    await click('.project-card');
    const titles = [...element.querySelectorAll('.mini-card-title')].map(t => t.textContent);

    expect(titles.length).toBe(component.projects.length - 1);
    expect(titles).not.toContain('Tender AI');

    await click('.mini-card');

    expect(component.selectedProject()?.title).toBe(titles[0]);
    expect(element.querySelector('.detail-title')?.textContent).toBe(titles[0]);
  });

  it('closes the detail view with the close button', async () => {
    await click('.project-card');
    await click('.detail-close');

    expect(component.selectedProject()).toBeNull();
    expect(element.querySelector('.project-overview')).not.toBeNull();
  });

  it('closes the detail view when the selected project is clicked again', async () => {
    await click('.project-card');
    await click('.detail-hero-toggle');

    expect(component.selectedProject()).toBeNull();
  });

  it('closes the detail view on escape and ignores escape when nothing is selected', async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();

    await click('.project-card');
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    await fixture.whenStable();

    expect(component.selectedProject()).toBeNull();
  });

  it('only shows a website link for projects that have one', async () => {
    await click('.project-card');
    expect(element.querySelector('.detail-link')).toBeNull();

    const withLink = component.projects.find(p => p.link)!;
    component.toggleProject(withLink);
    await fixture.whenStable();

    expect(element.querySelector('.detail-link')?.getAttribute('href')).toBe(withLink.link);
  });
});
