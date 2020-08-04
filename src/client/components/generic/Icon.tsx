import React, { Component } from 'react';
import IconProvider, { IconInfo, AppTag } from '../../api/iconProvider';

/**
 * Generates various KBase Narrative icons from input props.
 */

interface TypeProps {
  objType: string;
}

interface AppIconProps {
  appId: string;
  appTag: string;
}

interface DefaultIconProps {
  cellType: string;
}

// Font-awesome class names for each narrative cell type
enum CellIcons {
  code_cell = 'fa fa-code',
  kbase_app = 'fa fa-cube',
  markdown = 'fa fa-paragraph',
  widget = 'fa fa-wrench',
  data = 'fa fa-database',
}

/**
 * This renders an icon span for a typed object.
 * @param props TypeProps - in this case, just the object type string (Module.Type, like KBaseGenomes.Genome).
 */
export function TypeIcon(props: TypeProps) {
  const iconProvider = IconProvider.Instance;
  const iconInfo = iconProvider.typeIcon(props.objType);
  return (
    <span className="fa-stack fa-lg">
      <span
        className="fa fa-circle fa-stack-2x"
        style={{ color: iconInfo.color }}
      />
      <span className={`fa fa-inverse fa-stack-1x ${iconInfo.icon}`} />
    </span>
  );
}

interface AppIconState {
  iconInfo?: IconInfo;
}

/**
 * The AppCellIcon is a little more complex here. To avoid it being blank then popping it,
 * it starts by rendering a default icon. Then it asynchronously loads its icon based on the
 * app spec, which gets its info fetched from the IconProvider service.
 *
 * Its props are app id (ModuleName.appName) and tag (release, beta, or dev)
 */
export class AppCellIcon extends Component<AppIconProps, AppIconState> {
  state: AppIconState = {};

  /**
   * On mount, ask the icon provider to cough up the info about the app icon
   * so we can render it. This updates the iconInfo state.
   */
  async componentDidMount() {
    const iconProvider = IconProvider.Instance;
    const iconInfo = await iconProvider.appIcon(
      this.props.appId,
      this.props.appTag as AppTag
    );
    this.setState({
      iconInfo: iconInfo,
    });
  }

  /**
   * If we don't have the icon info yet, just make a little loading spinner "icon".
   *
   * Once it's loaded, either render the image or the icon.
   */
  render() {
    const iconInfo = this.state.iconInfo
      ? this.state.iconInfo
      : { isImage: false, icon: 'fa fa-spinner', color: 'silver' };

    if (iconInfo.isImage) {
      return (
        <span>
          <img
            src={iconInfo.url}
            style={{ maxWidth: '2.5em', maxHeight: '2.5em', margin: 0 }}
          />
        </span>
      );
    } else {
      return (
        <span className="fa-stack fa-lg">
          <span
            className="fa fa-square fa-stack-2x"
            style={{ color: iconInfo.color }}
          />
          <span className={`fa fa-inverse fa-stack-1x ${iconInfo.icon}`} />
        </span>
      );
    }
  }
}

export function DefaultIcon(props: DefaultIconProps) {
  let icon;
  switch (props.cellType) {
    case 'code':
      icon = CellIcons.code_cell;
      break;
    case 'markdown':
      icon = CellIcons.markdown;
      break;
    case 'data':
      icon = CellIcons.data;
      break;
    case 'app':
      icon = CellIcons.kbase_app;
      break;
    default:
      icon = CellIcons.widget;
      break;
  }
  return (
    <span className="fa-stack fa-lg">
      <span className="fa fa-square fa-stack-2x" style={{ color: 'silver' }} />
      <span className={`fa fa-inverse fa-stack-1x ${icon}`} />
    </span>
  );
}
