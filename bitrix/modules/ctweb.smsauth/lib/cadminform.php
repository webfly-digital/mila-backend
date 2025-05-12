<?php

namespace Ctweb\SMSAuth;

class CAdminForm extends \CAdminForm {
    function AddSelectField($id, $content, $required, $arSelect, $value = array(), $arParams = array())
    {
        if (!is_array($value))
            $value = array();
        $html = '<select name="' . $id . '[]"';
        foreach ($arParams as $param)
            $html .= ' ' . $param;
        $html .= '>';

        foreach ($arSelect as $key => $val)
            $html .= '<option value="' . htmlspecialcharsbx($key) . '"' . (in_array($key, $value) ? ' selected' : '') . '>' . htmlspecialcharsex($val) . '</option>';
        $html .= '</select>';

        $this->tabs[$this->tabIndex]["FIELDS"][$id] = array(
            "id" => $id,
            "required" => $required,
            "content" => $content,
            "html" => '<td width="40%">' . ($required ? '<span class="adm-required-field">' . $this->GetCustomLabelHTML($id, $content) . '</span>' : $this->GetCustomLabelHTML($id, $content)) . '</td><td>' . $html . '</td>',
            "hidden" => '<input type="hidden" name="' . $id . '" value="' . '' . '">',
        );
    }

    function addHiddenField($id, $value) {
        $this->tabs[$this->tabIndex]["FIELDS"][$id] = array(
            "id" => $id,
            "required" => false,
            "content" => "",
            "html" => '<input type="hidden" name="' . $id . '" value="' . htmlspecialchars($value) . '">',
            "hidden" => '<input type="hidden" name="' . $id . '" value="">',
        );
    }

    function AddSendTestField($id, $content, $params) {
        $html = "<input id='{$id}' type='text' placeholder='{$params['placeholder']}' /><input type='button' class='adm-btn-green' onclick='{$params['onclick']}' value='{$params['text']}'>";
        if ($params['error_block'])
            $html .= "<div id='{$id}_error'></div>";

        $this->tabs[$this->tabIndex]["FIELDS"][$id] = array(
            "id" => $id,
            "required" => false,
            "content" => $content,
            "html" => '<td valign="top" width="40%" class="adm-detail-content-cell-l">' . $this->GetCustomLabelHTML($id, $content) . '</td><td class="adm-detail-content-cell-r">' . $html . '</td>',
            "hidden" => '<input type="hidden" name="' . $id . '" value="' . '' . '">',
        );
    }

    function GetCustomLabelHTML($id = false, $content = "") {
        if (is_array($content)) {
            $hint = $content[1];
            $content = $content[0];
        }

        $label = parent::GetCustomLabelHTML($id, $content);
        if ($hint) {
            $label = "<div>" . $label . "</div><small>" . $hint . "</small>";
        }

        return $label;
    }
}